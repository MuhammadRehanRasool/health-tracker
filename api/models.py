from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    signedUpAt = models.DateTimeField(auto_now_add=True)


class MuscleGroup(models.Model):
    name = models.CharField(max_length=300, unique=True)
    user = models.ForeignKey(
        CustomUser, related_name="muscle_group_user", on_delete=models.CASCADE)


class Exercise(models.Model):
    name = models.CharField(max_length=300, unique=True)
    muscleGroup = models.ForeignKey(
        MuscleGroup, related_name="exercise_group", on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(
        CustomUser, related_name="exercise_user", on_delete=models.CASCADE)


class Workout(models.Model):
    name = models.CharField(max_length=300, unique=True)
    exercises = models.JSONField()
    muscleGroup = models.ForeignKey(
        MuscleGroup, related_name="workout_group", on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(
        CustomUser, related_name="workout_user", on_delete=models.CASCADE)


class Schedule(models.Model):
    day = models.CharField(max_length=300, unique=True)
    workout = models.ForeignKey(
        Workout, related_name="schedule_workout", on_delete=models.CASCADE)
    user = models.ForeignKey(
        CustomUser, related_name="schedule_user", on_delete=models.CASCADE)


class Stopwatch(models.Model):
    datetime = models.DateTimeField(auto_now_add=True)
    seconds = models.IntegerField()
    user = models.ForeignKey(
        CustomUser, related_name="stopwatch_user", on_delete=models.CASCADE)


class BMI(models.Model):
    datetime = models.DateTimeField(auto_now_add=True)
    height = models.IntegerField()
    weight = models.IntegerField()
    bmi = models.CharField(max_length=300, default="")
    status = models.CharField(max_length=300, default="")
    user = models.ForeignKey(
        CustomUser, related_name="bmi_user", on_delete=models.CASCADE)
