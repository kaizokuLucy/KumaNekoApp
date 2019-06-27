import psycopg2
import json
from django.utils import timezone
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseRedirect, HttpResponse
from .models import CustomUser
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken

db_username = 'postgres'
db_password = 'lunavuna'
db_host = '127.0.0.1'
db_port = '5432'
db_name = 'KumaNekoDB'

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = UserSerializer(request.user)
    print(serializer.data)
    return Response(serializer.data)

class RetrieveStatistics(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        ret_value = ''
        ret_status = status.HTTP_200_OK
        data = json.loads(request.body)
        #print(f"DATA: {data}")
        try:
            connection = psycopg2.connect(
                    user = db_username,
                    password=db_password,
                    host=db_host,
                    port=db_port,
                    database=db_name)
            cursor = connection.cursor()

            #SELECT username, date, letter, application_question.incorrect_tries
            #FROM application_customuser JOIN application_practice ON application_practice.user_id = application_customuser.id
            #JOIN application_question ON application_question.practice = application_practice.id
            #GROUP BY username, date, letter, application_question.incorrect_tries
            #ORDER BY username, date;

            #SELECT username, date, correct_answers_number, letter, users_answer
            #FROM application_customuser JOIN application_test ON application_test.user_id = application_customuser.id
            #JOIN application_question ON application_question.test = application_test.id
            #WHERE application_test.correct_answers_number != 16
            #GROUP BY username, date, correct_answers_number, letter, users_answer
            #ORDER BY username, date;

            print("Getting user ID")
            get_user_id = """SELECT id FROM application_customuser WHERE username LIKE %s"""
            username = (data['username'],)

            cursor.execute(get_user_id, username)

            user_id = cursor.fetchone()[0]

            print("Getting test data")
            get_test_data = """SELECT date, correct_answers_number, duration
                    FROM application_customuser JOIN application_test ON application_test.user_id = application_customuser.id
                    WHERE application_customuser.username LIKE %s"""


            get_practice_data = """
            SELECT date, duration, letter, incorrect_tries
                FROM application_customuser JOIN application_practice ON application_practice.user_id = application_customuser.id JOIN application_question ON application_question.practice = application_practice.id
                WHERE application_customuser.username LIKE %s
            """

            cursor.execute(get_test_data, username)

            ret_value  = cursor.fetchall()
            ret_status = status.HTTP_200_OK
            #test_id = cursor.fetchone()[0]

            print("Packing up JSON")
            ret_data = {}
            i = 1
            ret_data['test'] = {}
            ret_data['practice'] = {}
            for k,v,x in ret_value:
                #print(f"K: {k}, v: {v}, x: {x}")
                #ret_data['test'][i] = {'date': f"{k.year:02}-{k.month:02}-{k.day:02}", 'time': f"{k.hour:02}:{k.minute:02}:{k.second:02}", 'correct_answers': v, 'duration': x}
                ret_data['test'][i] = {'date': "2019-06-22", 'time': "14:22:00", 'correct_answers': v, 'duration': x}
                i += 1


            cursor.execute(get_practice_data, username)
            ret_value = cursor.fetchall()

            #print(f"QUERY VRATIO: {len(ret_value)}")
            i = 1
            for date, dur, ltr, tries in ret_value:
                #ret_data['practice'][i] = {'date': f"{date.year:02}-{date.month:02}-{date.day:02}", 'time': f"{date.hour:02}:{date.minute:02}:{date.second:02}", 'letter': ltr, 'duration': dur, 'tries': tries}
                ret_data['practice'][i] = {'date': "2019-06-22", 'time': "14:00:00", 'letter': ltr, 'duration': dur, 'tries': tries}
                i += 1
            #time, dur, simbol, incorrect

            ret_value = ret_data
            #print(f"Sending back {ret_value}")

        except Exception as e:
            pass
            #print(f"Exception: {e}")
        finally:
            if (connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")

        return Response(ret_value, status=ret_status)


class StoreTestData(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = json.loads(request.body)
        #print(f"DATA: {data}")
        try:
            connection = psycopg2.connect(
                    user = db_username,
                    password=db_password,
                    host=db_host,
                    port=db_port,
                    database=db_name)
            cursor = connection.cursor()

            get_user_id = """SELECT id FROM application_customuser WHERE username=%s"""
            username = (data['username'],)

            cursor.execute(get_user_id, username)

            user_id = cursor.fetchone()[0]

            store_test_data = 'INSERT INTO application_test(duration, date, correct_answers_number, user_id) VALUES(%s, %s, %s, %s) RETURNING id'
            test_data = (data['duration'], timezone.now(), data['correct_answers'], user_id,)
            cursor.execute(store_test_data, test_data)

            test_id = cursor.fetchone()[0]

            for k,v in data['userAnswers'].items():
                cursor.execute('INSERT INTO application_question(is_test, is_practice, letter, users_answer, test) VALUES(%s, %s, %s, %s, %s)', (True, False, k, v, test_id))

            connection.commit()

        except Exception as e:
            pass
            #print(f"Exception: {e}")
        finally:
            if (connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")

        return Response({'status': 'Successfully inserted into test tables'}, status=status.HTTP_200_OK)

class StorePracticeData(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = json.loads(request.body)
        #print(f"DATA: {data}")
        try:
            connection = psycopg2.connect(
                    user = db_username,
                    password=db_password,
                    host=db_host,
                    port=db_port,
                    database=db_name)
            cursor = connection.cursor()

            get_user_id = """SELECT id FROM application_customuser WHERE username=%s"""
            username = (data['username'],)

            cursor.execute(get_user_id, username)

            user_id = cursor.fetchone()[0]

            #print(f"user_id: {user_id}")

            store_practice_data = 'INSERT INTO application_practice(duration, date, user_id) VALUES(%s, %s, %s) RETURNING id'
            practice_data = (data['duration'], timezone.now(), user_id,)

            cursor.execute(store_practice_data, practice_data)

            practice_id = cursor.fetchone()[0]

            #print(f"practice_id: {practice_id}")
          
            
            for k,v in data['userAnswers'].items():
                cursor.execute('INSERT INTO application_question(is_test, is_practice, letter, practice, incorrect_tries) VALUES(%s, %s, %s, %s, %s)', (False, True, k, practice_id, v))

            connection.commit()

        except Exception as e:
            pass
            #print(f"Exception za pratice: {e}")
        finally:
            if (connection):
                cursor.close()
                connection.close()
                print("PostgreSQL connection is closed")

        return Response({'status': 'successful'}, status=status.HTTP_200_OK)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
