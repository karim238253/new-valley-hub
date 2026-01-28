from django.contrib import admin
from .models import Attraction, DigitalArtifact, TeamMember, GovernorProfile

@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name', 'attraction_type', 'visit_duration_minutes', 'ticket_price', 'opening_time', 'closing_time')
    list_filter = ('attraction_type',)
    search_fields = ('name', 'description')
    ordering = ('name',)

@admin.register(DigitalArtifact)
class DigitalArtifactAdmin(admin.ModelAdmin):
    list_display = ('name', 'related_attraction', 'image_url')
    search_fields = ('name', 'description')
    fields = ('name', 'description', 'image', 'image_url', 'related_attraction', 'model_3d_file', 'virtual_tour_url')

from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'profile_url')
    search_fields = ('name', 'role')
    fields = ('name', 'role', 'photo', 'photo_url', 'profile_url')

@admin.register(GovernorProfile)
class GovernorProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title')
    # Prevent deletion if you want it to be strictly singleton, 
    # but for now we trust the save() method override.
