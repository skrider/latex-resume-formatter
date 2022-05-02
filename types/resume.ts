type METResume = {
  content: {
    name: string;
    phone_number: string;
    email: string;
    linkedin_url: string;
    personal_website_url: string;
    education: StudentEduction;
    experience: StudentExperienceSection[];
    info: StudentInfoSection[];
  };
  config: {
    use_fancy_urls: string;
  };
};

enum StudentDegree {
  MECHE,
  EECS,
  IEOR,
  UNDECLARED,
  BIOE,
  CIVILE,
  MATSCI,
}

type StudentEduction = {
  grad_date: string;
  track: StudentDegree;
  // should probably think about encryption when we go to store this
  gpa?: number;
  coursework?: string[];
  high_school?: {
    name: string;
    city: string;
    state: string;
    facts?: string[];
  };
};

type StudentPosition = {
  title: string;
  date_range: string;
  facts?: string;
};

type StudentExperience = {
  organization: string;
  description?: string;
  location: string;
  date_range: string;
  positions?: StudentPosition[];
};

type StudentExperienceSection = {
  display_title: string;
  experience: StudentExperience[];
};

type StudentInfoSection = {
  display_title: string;
  facts: string[];
};

export type {
  METResume,
  StudentDegree,
  StudentEduction,
  StudentPosition,
  StudentExperience,
  StudentExperienceSection,
  StudentInfoSection,
};
