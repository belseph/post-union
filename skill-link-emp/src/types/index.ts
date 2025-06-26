export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'mentor' | 'entrepreneur';
}

export interface Mentorship {
  id: string;
  mentee: {
    name: string;
    avatar: string;
    project: string;
  };
  status: 'active' | 'completed' | 'paused';
  progress: number;
  nextSession: string;
  hoursCompleted: number;
  totalHours: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'ideation' | 'development' | 'validation' | 'launch';
  progress: number;
  teamMembers: number;
  mentor?: {
    name: string;
    avatar: string;
    specialty: string;
  };
  daysUntilPitch: number;
}

export interface Session {
  id: string;
  type: 'mentoring' | 'team-meeting' | 'pitch-practice';
  title: string;
  time: string;
  participants: string[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  message: string;
  time: string;
  read: boolean;
}