"""
Create a prototype/architecture diagram for the PG Finder project
Requires: pip install matplotlib
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Rectangle, Circle
import matplotlib.patches as mpatches

def create_prototype_diagram():
    fig, ax = plt.subplots(1, 1, figsize=(16, 10))
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 10)
    ax.axis('off')
    
    # Colors
    purple = '#7c3aed'
    indigo = '#6366f1'
    light_purple = '#c4b5fd'
    light_gray = '#f3f4f6'
    dark_gray = '#1f2937'
    
    # Title
    ax.text(8, 9.5, 'PG Accommodation Finder - System Architecture', 
            ha='center', va='center', fontsize=20, fontweight='bold', color=purple)
    
    # User Layer
    user_box = FancyBboxPatch((1, 7), 3, 1.5, boxstyle="round,pad=0.1", 
                              facecolor=light_purple, edgecolor=purple, linewidth=2)
    ax.add_patch(user_box)
    ax.text(2.5, 8.2, 'Users', ha='center', va='center', fontsize=14, fontweight='bold')
    ax.text(2.5, 7.7, 'Students', ha='center', va='center', fontsize=11)
    ax.text(2.5, 7.3, 'Professionals', ha='center', va='center', fontsize=11)
    
    # Owner Layer
    owner_box = FancyBboxPatch((12, 7), 3, 1.5, boxstyle="round,pad=0.1", 
                               facecolor=light_purple, edgecolor=purple, linewidth=2)
    ax.add_patch(owner_box)
    ax.text(13.5, 8.2, 'Owners', ha='center', va='center', fontsize=14, fontweight='bold')
    ax.text(13.5, 7.7, 'PG Owners', ha='center', va='center', fontsize=11)
    ax.text(13.5, 7.3, 'Managers', ha='center', va='center', fontsize=11)
    
    # Frontend Layer
    frontend_box = FancyBboxPatch((0.5, 4.5), 15, 2, boxstyle="round,pad=0.15", 
                                 facecolor=light_gray, edgecolor=indigo, linewidth=2.5)
    ax.add_patch(frontend_box)
    ax.text(8, 6.2, 'Frontend Application (React)', ha='center', va='center', 
            fontsize=16, fontweight='bold', color=indigo)
    
    # Pages Section
    pages_box = FancyBboxPatch((1, 4.7), 6.5, 1.5, boxstyle="round,pad=0.1", 
                              facecolor='white', edgecolor=purple, linewidth=1.5)
    ax.add_patch(pages_box)
    ax.text(4.25, 5.7, 'Pages/Components', ha='center', va='center', 
            fontsize=12, fontweight='bold', color=purple)
    ax.text(2.5, 5.3, '• Home', ha='left', va='center', fontsize=9)
    ax.text(2.5, 5.0, '• Listings', ha='left', va='center', fontsize=9)
    ax.text(2.5, 4.75, '• PG Details', ha='left', va='center', fontsize=9)
    ax.text(5, 5.3, '• Dashboard', ha='left', va='center', fontsize=9)
    ax.text(5, 5.0, '• Add/Edit PG', ha='left', va='center', fontsize=9)
    ax.text(5, 4.75, '• Booking', ha='left', va='center', fontsize=9)
    
    # Context/State Section
    context_box = FancyBboxPatch((8.5, 4.7), 6.5, 1.5, boxstyle="round,pad=0.1", 
                                facecolor='white', edgecolor=indigo, linewidth=1.5)
    ax.add_patch(context_box)
    ax.text(11.75, 5.7, 'State Management', ha='center', va='center', 
            fontsize=12, fontweight='bold', color=indigo)
    ax.text(9.5, 5.3, '• PGContext', ha='left', va='center', fontsize=9)
    ax.text(9.5, 5.0, '• Listings State', ha='left', va='center', fontsize=9)
    ax.text(9.5, 4.75, '• Reviews/Bookings', ha='left', va='center', fontsize=9)
    ax.text(12, 5.3, '• LocalStorage', ha='left', va='center', fontsize=9)
    ax.text(12, 5.0, '• CRUD Operations', ha='left', va='center', fontsize=9)
    ax.text(12, 4.75, '• Filter/Sort Logic', ha='left', va='center', fontsize=9)
    
    # Data Storage Layer
    storage_box = FancyBboxPatch((1, 2), 14, 1.5, boxstyle="round,pad=0.1", 
                                facecolor='#e0e7ff', edgecolor=indigo, linewidth=2)
    ax.add_patch(storage_box)
    ax.text(8, 2.9, 'Data Storage', ha='center', va='center', 
            fontsize=14, fontweight='bold', color=indigo)
    
    # JSON Storage
    json_box = FancyBboxPatch((2, 2.2), 3, 1, boxstyle="round,pad=0.1", 
                             facecolor='white', edgecolor=purple, linewidth=1.5)
    ax.add_patch(json_box)
    ax.text(3.5, 2.7, 'pgs.json', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(3.5, 2.4, 'PG Listings Data', ha='center', va='center', fontsize=9)
    
    # LocalStorage
    local_box = FancyBboxPatch((6.5, 2.2), 3, 1, boxstyle="round,pad=0.1", 
                              facecolor='white', edgecolor=purple, linewidth=1.5)
    ax.add_patch(local_box)
    ax.text(8, 2.7, 'LocalStorage', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(8, 2.4, 'Reviews & Bookings', ha='center', va='center', fontsize=9)
    
    # Future API
    api_box = FancyBboxPatch((11, 2.2), 3, 1, boxstyle="round,pad=0.1", 
                            facecolor='#fef3c7', edgecolor='#f59e0b', linewidth=1.5, linestyle='--')
    ax.add_patch(api_box)
    ax.text(12.5, 2.7, 'Future: API', ha='center', va='center', fontsize=11, fontweight='bold')
    ax.text(12.5, 2.4, 'Backend Integration', ha='center', va='center', fontsize=9)
    
    # Arrows - User to Frontend
    arrow1 = FancyArrowPatch((2.5, 7), (4, 6.5), arrowstyle='->', 
                            mutation_scale=20, color=purple, linewidth=2)
    ax.add_patch(arrow1)
    ax.text(3, 6.8, 'Browse', ha='center', va='center', fontsize=8, color=purple)
    
    arrow2 = FancyArrowPatch((2.5, 7), (4, 5.5), arrowstyle='->', 
                            mutation_scale=20, color=purple, linewidth=2)
    ax.add_patch(arrow2)
    ax.text(3, 6.2, 'Search', ha='center', va='center', fontsize=8, color=purple)
    
    arrow3 = FancyArrowPatch((2.5, 7), (4, 4.5), arrowstyle='->', 
                            mutation_scale=20, color=purple, linewidth=2)
    ax.add_patch(arrow3)
    ax.text(3, 5.6, 'Book', ha='center', va='center', fontsize=8, color=purple)
    
    # Arrows - Owner to Frontend
    arrow4 = FancyArrowPatch((13.5, 7), (12, 6.5), arrowstyle='->', 
                            mutation_scale=20, color=purple, linewidth=2)
    ax.add_patch(arrow4)
    ax.text(12.8, 6.8, 'Manage', ha='center', va='center', fontsize=8, color=purple)
    
    arrow5 = FancyArrowPatch((13.5, 7), (12, 5.5), arrowstyle='->', 
                            mutation_scale=20, color=purple, linewidth=2)
    ax.add_patch(arrow5)
    ax.text(12.8, 6.2, 'Add/Edit', ha='center', va='center', fontsize=8, color=purple)
    
    arrow6 = FancyArrowPatch((13.5, 7), (12, 4.5), arrowstyle='->', 
                            mutation_scale=20, color=purple, linewidth=2)
    ax.add_patch(arrow6)
    ax.text(12.8, 5.6, 'Bookings', ha='center', va='center', fontsize=8, color=purple)
    
    # Arrows - Frontend to Storage
    arrow7 = FancyArrowPatch((4.25, 4.7), (3.5, 3.2), arrowstyle='->', 
                            mutation_scale=20, color=indigo, linewidth=2)
    ax.add_patch(arrow7)
    
    arrow8 = FancyArrowPatch((8, 4.7), (8, 3.2), arrowstyle='->', 
                            mutation_scale=20, color=indigo, linewidth=2)
    ax.add_patch(arrow8)
    
    arrow9 = FancyArrowPatch((11.75, 4.7), (12.5, 3.2), arrowstyle='->', 
                            mutation_scale=20, color='#f59e0b', linewidth=2, linestyle='--')
    ax.add_patch(arrow9)
    
    # Tech Stack Box
    tech_box = FancyBboxPatch((0.5, 0.2), 15, 1.2, boxstyle="round,pad=0.1", 
                            facecolor='#fef3c7', edgecolor='#f59e0b', linewidth=2)
    ax.add_patch(tech_box)
    ax.text(8, 1.1, 'Technology Stack', ha='center', va='center', 
            fontsize=14, fontweight='bold', color='#d97706')
    ax.text(2, 0.7, 'React 18', ha='center', va='center', fontsize=10, fontweight='bold')
    ax.text(4, 0.7, 'React Router', ha='center', va='center', fontsize=10, fontweight='bold')
    ax.text(6, 0.7, 'Context API', ha='center', va='center', fontsize=10, fontweight='bold')
    ax.text(8, 0.7, 'TailwindCSS', ha='center', va='center', fontsize=10, fontweight='bold')
    ax.text(10, 0.7, 'Vite', ha='center', va='center', fontsize=10, fontweight='bold')
    ax.text(12, 0.7, 'LocalStorage', ha='center', va='center', fontsize=10, fontweight='bold')
    ax.text(14, 0.7, 'JSON', ha='center', va='center', fontsize=10, fontweight='bold')
    
    plt.tight_layout()
    plt.savefig('PG_Finder_Architecture_Diagram.png', dpi=300, bbox_inches='tight', 
                facecolor='white', edgecolor='none')
    print("Diagram saved as PG_Finder_Architecture_Diagram.png")
    plt.close()

if __name__ == "__main__":
    create_prototype_diagram()



