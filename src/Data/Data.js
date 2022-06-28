export const applicant_status = [
  { name: 'Rejected', value: 'Rejected' },
  { name: 'Unavailable', value: 'Unavailable' },
  { name: 'Screening', value: 'Screening' },
  { name: 'L1 select', value: 'L1 select' },
  { name: 'L2 select', value: 5 },
  { name: 'Client select', value: 'Client select' },
  { name: 'Offered', value: 'Offered' },
]

export const applicant_type = [
  { name: 'IJP Landed', value: 'IJP Landed' },
  { name: 'External Hire', value: 'External Hire' },
  { name: 'Internal', value: 'Internal' },
]

export const demand_status = [
  { name: 'Proposed', value: 'proposed' },
  { name: 'Profiles Required', value: 'Profiles Required' },
  { name: 'Resource Identified', value: 'Resource Identified' },
  { name: 'Demand Validation', value: 'Demand Validation' },
  { name: 'Profile Proposed', value: 'Profile Proposed' },
  { name: 'Profile Required', value: 'Profile Required' },
]

export const demand_grade = [
  { name: 'A1', value: 'A1' },
  { name: 'A2', value: 'A2' },
  { name: 'B1', value: 'B1' },
  { name: 'B2', value: 'B2' },
  { name: 'C1', value: 'C1' },
  { name: 'C2', value: 'C2' },
  { name: 'D1', value: 'D1' },
  { name: 'D2', value: 'D2' },
  { name: 'E1', value: 'E1' },
  { name: 'E2', value: 'E2' },
]

export let form = {
  codeRequisition: null,
  startDate: null,
  clientID: null,
  originatorName: null,
  skillsID: null,
  probability: null,
  grade: null,
  selectedApplicant: null,
  status: null,
  notes: null,
  proposedApplicant: null,
  creationDate: null,
  location: null,
}
