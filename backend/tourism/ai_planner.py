from .models import Attraction

def generate_itinerary(days, budget_level, interests):
    """
    Generates a simple itinerary based on rules.
    budget_level: 1 (Low), 2 (Medium), 3 (High)
    interests: list of strings ['natural', 'historical', 'cultural']
    """
    all_attractions = Attraction.objects.all()
    
    # Simple Mock "AI" Logic
    # 1. Filter by Interest
    relevant_attractions = [
        a for a in all_attractions 
        if a.attraction_type in interests or not interests
    ]
    
    # 2. Add some filler if not enough specific interests
    if len(relevant_attractions) < days:
        other_attractions = [a for a in all_attractions if a not in relevant_attractions]
        relevant_attractions.extend(other_attractions)
    

    # 4. Calculate Costs
    # Budget Levels:
    # Low: 550 EGP/day
    # Medium: 1300 EGP/day
    # High: 3500 EGP/day
    
    daily_rates = {
        'low': 550,
        'medium': 1300,
        'high': 3500
    }
    
    # Normalize budget string (handle different casings if needed)
    budget_key = str(budget_level).lower() if str(budget_level).lower() in daily_rates else 'medium'
    daily_cost = daily_rates[budget_key]
    
    base_cost = daily_cost * days
    
    # A better approach: Sum prices during the loop in Step 3
    # Let's refactor Step 3 slightly to sum up tickets.
    
    total_ticket_price = 0
    # Refill the itinerary loop to include price calculation
    itinerary = []
    items_per_day = 2 # Basic rule
    current_idx = 0
    for day in range(1, days + 1):
        day_plan = {
            "day": day,
            "activities": []
        }
        
        # Add 1-2 activities per day
        for _ in range(items_per_day):
            if current_idx < len(relevant_attractions):
                attr = relevant_attractions[current_idx]
                day_plan["activities"].append({
                    "name": attr.name,
                    "time": "Morning" if _ == 0 else "Afternoon",
                    "description": attr.description,
                    "image": attr.image if attr.image else None,
                    "price": float(attr.ticket_price)
                })
                total_ticket_price += float(attr.ticket_price)
                current_idx += 1
        
        itinerary.append(day_plan)

    total_estimated_cost = base_cost + total_ticket_price

    return {
        "itinerary": itinerary,
        "total_estimated_cost": total_estimated_cost
    }

