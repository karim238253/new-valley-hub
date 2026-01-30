from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AttractionViewSet, DigitalArtifactViewSet, TeamMemberViewSet, GovernorProfileViewSet, ChatAPIView, SearchAPIView

router = DefaultRouter()
router.register(r'attractions', AttractionViewSet)
router.register(r'artifacts', DigitalArtifactViewSet)
router.register(r'team', TeamMemberViewSet)
router.register(r'governor', GovernorProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('chat/', ChatAPIView.as_view(), name='chat'),
    path('search/', SearchAPIView.as_view(), name='global-search'),
]
