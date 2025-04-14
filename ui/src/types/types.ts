export interface PieDataProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}
export interface FeatureType {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface CollegeData {
  school_name: string;
  in_state_tuition: number | string;
  out_of_state_tuition: number | string;
  admission_rate: number | string;
}
