export type RelationshipGroup =
	| "Family"
	| "Romantic"
	| "Professional"
	| "Social"
	| "Community"
	| "Pets";

export interface RelationshipOption {
	value: string;
	label: string;
	group: RelationshipGroup;
}

export const relationshipOptions = [
  // Family Relationships
  { value: "parent", label: "Parent", group: "Family" },
  { value: "stepparent", label: "Stepparent", group: "Family" },
  { value: "grandparent", label: "Grandparent", group: "Family" },
  { value: "sibling", label: "Sibling", group: "Family" },
  { value: "stepsibling", label: "Stepsibling", group: "Family" },
  { value: "half-sibling", label: "Half-sibling", group: "Family" },
  { value: "child", label: "Child", group: "Family" },
  { value: "stepchild", label: "Stepchild", group: "Family" },
  { value: "uncle-aunt", label: "Uncle/Aunt", group: "Family" },
  { value: "nibling", label: "Nibling (Niece/Nephew)", group: "Family" },
  { value: "cousin", label: "Cousin", group: "Family" },
  { value: "godparent", label: "Godparent", group: "Family" },
  { value: "godchild", label: "Godchild", group: "Family" },

  // Romantic Relationships
  { value: "partner", label: "Partner", group: "Romantic" },
  { value: "spouse", label: "Spouse", group: "Romantic" },
  { value: "fiance", label: "Fiancé(e)", group: "Romantic" },
  { value: "significant-other", label: "Significant Other", group: "Romantic" },
  { value: "ex-partner", label: "Ex-Partner", group: "Romantic" },
  { value: "ex-spouse", label: "Ex-Spouse", group: "Romantic" },

  // Professional Relationships
  { value: "colleague", label: "Colleague", group: "Professional" },
  { value: "supervisor", label: "Supervisor", group: "Professional" },
  { value: "team-member", label: "Team Member", group: "Professional" },
  { value: "employee", label: "Employee", group: "Professional" },
  { value: "mentor", label: "Mentor", group: "Professional" },
  { value: "mentee", label: "Mentee", group: "Professional" },
  { value: "client", label: "Client", group: "Professional" },
  { value: "vendor", label: "Vendor", group: "Professional" },
  { value: "business-partner", label: "Business Partner", group: "Professional" },
  { value: "contractor", label: "Contractor", group: "Professional" },
  { value: "consultant", label: "Consultant", group: "Professional" },

  // Social / Friend Relationships
  { value: "best-friend", label: "Best Friend", group: "Social" },
  { value: "friend", label: "Friend", group: "Social" },
  { value: "acquaintance", label: "Acquaintance", group: "Social" },
  { value: "neighbor", label: "Neighbor", group: "Social" },
  { value: "roommate", label: "Roommate", group: "Social" },
  { value: "classmate", label: "Classmate", group: "Social" },
  { value: "teammate", label: "Teammate", group: "Social" },
  { value: "coach", label: "Coach", group: "Social" },

  // Community / Other Relationships
  { value: "healthcare-provider", label: "Healthcare Provider", group: "Community" },
  { value: "legal-advisor", label: "Legal Advisor", group: "Community" },
  { value: "therapist", label: "Therapist", group: "Community" },
  { value: "teacher", label: "Teacher", group: "Community" },
  { value: "tutor", label: "Tutor", group: "Community" },
  { value: "trainer", label: "Trainer", group: "Community" },
  { value: "spiritual-advisor", label: "Spiritual Advisor", group: "Community" },
  { value: "counselor", label: "Counselor", group: "Community" },
  { value: "volunteer", label: "Volunteer", group: "Community" },
  { value: "fellow-member", label: "Fellow Member", group: "Community" },
  { value: "caregiver", label: "Caregiver", group: "Community" },
  { value: "tenant", label: "Tenant", group: "Community" },
  { value: "landlord", label: "Landlord", group: "Community" },
  { value: "service-provider", label: "Service Provider", group: "Community" },

  // Pet Relationships
  { value: "pet", label: "Pet", group: "Pets" },
  { value: "animal-companion", label: "Animal Companion", group: "Pets" },
];
