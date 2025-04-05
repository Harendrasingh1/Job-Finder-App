export interface Job {
  id: number;
  title: string;
  primary_details: {
    Place: string;
    Salary: string;
    Job_Type: string;
    Experience: string;
    Fees_Charged: string;
    Qualification: string;
  };
  company_name: string;
  whatsapp_no: string;
  job_category: string;
  other_details: string;
  is_bookmarked: boolean;
  creatives: Array<{
    file: string;
    thumb_url: string;
    creative_type: number;
  }>;
}

export interface ApiResponse {
  results: Job[];
}