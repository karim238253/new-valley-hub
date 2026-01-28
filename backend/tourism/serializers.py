from rest_framework import serializers
from .models import Attraction, DigitalArtifact, TeamMember, GovernorProfile

class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'

class DigitalArtifactSerializer(serializers.ModelSerializer):
    final_image_src = serializers.ReadOnlyField()

    class Meta:
        model = DigitalArtifact
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    final_photo = serializers.ReadOnlyField()

    class Meta:
        model = TeamMember
        fields = '__all__'

class GovernorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernorProfile
        fields = '__all__'
