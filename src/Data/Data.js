export const applicant_status = [
  { name: 'Rejected', value: 'Rejected' },
  { name: 'Unavailable', value: 'Unavailable' },
  { name: 'Screening', value: 'Screening' },
  { name: 'L1 select', value: 'L1 select' },
  { name: 'L2 select', value: 'L2 select' },
  { name: 'Client select', value: 'Client select' },
  { name: 'Offered', value: 'Offered' },
]

export const applicant_type = [
  { name: 'IJP Landed', value: 'IJP Landed' },
  { name: 'External Hire', value: 'External Hire' },
  { name: 'Internal', value: 'Internal' },
]

export const demand_status = [
  { name: 'Profiles Required', value: 'Profiles Required' },
  { name: 'Resource Identified', value: 'Resource Identified' },
  { name: 'Demand Validation', value: 'Demand Validation' },
  { name: 'Profile Proposed', value: 'Profile Proposed' },
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

export let demandForm = {
  demandCodeRequisition: null,
  demandStartDate: null,
  demandClientID: null,
  demandOriginatorName: null,
  demandSkills: null,
  demandProbability: null,
  demandGrade: null,
  demandSelectedApplicant: null,
  demandStatus: null,
  demandNotes: null,
  demandProposedApplicant: null,
  demandCreationDate: null,
  demandLocation: null,
}

export let supplyForm = {
  applicantFirstName: null,
  applicantLastName: null,
  applicantStatus: null,
  applicantSkills: null,
  applicantNotes: null,
  applicantType: null,
  applicantLocation: null,
}

export let clientForm = {
  clientID: null,
  clientName: null,
}

export const supplyDataset = [
  {
    label: 'Screening',
    data: [],
    backgroundColor: '#FFF4CF',
    stack: 'Stack 0',
  },
  {
    label: 'L1 select',
    data: [],
    backgroundColor: '#FFCB42',
    stack: 'Stack 0',
  },
  {
    label: 'L2 select',
    data: [],
    backgroundColor: '#FFB200',
    stack: 'Stack 0',
  },
  {
    label: 'Client select',
    data: [],
    backgroundColor: '#277BC0',
    stack: 'Stack 0',
  },
]
export const demandDataset = [
  {
    label: 'Profiles Required',
    data: [],
    backgroundColor: '#90B77D',
    stack: 'Stack 1',
  },
  {
    label: 'Demand Validation',
    data: [],
    backgroundColor: '#42855B',
    stack: 'Stack 1',
  },
  {
    label: 'Profile Proposed',
    data: [],
    backgroundColor: '#D2D79F',
    stack: 'Stack 1',
  },
]
export const groupedOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}
