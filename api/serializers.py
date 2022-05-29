from . import models
from rest_framework import serializers


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = models.CustomUser
        fields = ('email', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ViewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ('id', 'email', 'username',
                  'first_name', 'last_name', 'signedUpAt')


class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MuscleGroup
        fields = ('id', 'name', 'user')


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Exercise
        fields = ('id', 'name', 'muscleGroup', 'user')


class ViewExerciseSerializer(serializers.ModelSerializer):
    muscleGroup = MuscleGroupSerializer()

    class Meta:
        model = models.Exercise
        fields = ('id', 'name', 'muscleGroup', 'user')


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Workout
        fields = ('id', 'name', 'exercises', 'muscleGroup', 'user')


class ViewWorkoutSerializer(serializers.ModelSerializer):
    muscleGroup = MuscleGroupSerializer()

    class Meta:
        model = models.Workout
        fields = ('id', 'name', 'exercises', 'muscleGroup', 'user')


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Schedule
        fields = ('id', 'day', 'workout', 'user')


class ViewScheduleSerializer(serializers.ModelSerializer):
    workout = WorkoutSerializer()

    class Meta:
        model = models.Schedule
        fields = ('id', 'day', 'workout', 'user')


class StopwatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Stopwatch
        fields = ('id', 'datetime', 'seconds', 'user')


class BMISerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BMI
        fields = ('id', 'datetime', 'height', 'weight', 'bmi', 'status', 'user')
