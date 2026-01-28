from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Attraction, DigitalArtifact, TeamMember, GovernorProfile
from .serializers import AttractionSerializer, DigitalArtifactSerializer, TeamMemberSerializer, GovernorProfileSerializer
from .ai_planner import generate_itinerary

class AttractionViewSet(viewsets.ModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer

    @action(detail=False, methods=['post'])
    def generate_plan(self, request):
        days = int(request.data.get('days', 3))
        budget = request.data.get('budget', 'medium') # low, medium, high
        interests = request.data.get('interests', []) # list of types

        result = generate_itinerary(days, budget, interests)
        return Response(result)

class DigitalArtifactViewSet(viewsets.ModelViewSet):
    queryset = DigitalArtifact.objects.all()
    serializer_class = DigitalArtifactSerializer

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class GovernorProfileViewSet(viewsets.ModelViewSet):
    queryset = GovernorProfile.objects.all()
    serializer_class = GovernorProfileSerializer
    
    # Optional context: if you want to ensure the singleton exists,
    # you could override list, but the model has a load() method 
    # and we can rely on data seeding or manual creation for now.
    # But to be safe, let's override get_object or ensure seed.
    # Actually, a simple ModelViewSet is fine, frontend will fetch list[0].
