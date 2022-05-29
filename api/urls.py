from django.urls import path, re_path
from rest_framework_simplejwt import views as jwt_views
from . import views

urlpatterns = [
    path('users', views.CustomUserCreate.as_view(), name="users"),
    re_path(r'^muscle_group$', views.MuscleGroup),
    re_path(r'^muscle_group/(?P<pk>[0-9]+)$', views.MyMuscleGroup),
    re_path(r'^exercise$', views.Exercise),
    re_path(r'^exercise/(?P<pk>[0-9]+)$', views.MyExercise),
    re_path(r'^workout$', views.Workout),
    re_path(r'^workout/(?P<pk>[0-9]+)$', views.MyWorkout),
    re_path(r'^schedule$', views.Schedule),
    re_path(r'^schedule/(?P<pk>[0-9]+)$', views.MySchedule),
    path('token/obtain', views.MyTokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
