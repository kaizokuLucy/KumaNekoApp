from django.urls import path
from .views import current_user, UserList, StorePracticeData, StoreTestData, RetrieveStatistics

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('store_practice_data/', StorePracticeData.as_view()),
    path('store_test_data/', StoreTestData.as_view()),
    path('fetch_stats/', RetrieveStatistics.as_view()),
]
