import * as yup from 'yup'
import formValidators from '../../formValidatorsConfig.json'

const demandInputs = formValidators.demandForm.inputs

export const demandSchema = yup.object().shape({
  codeRequisition: demandInputs.demandCodeRequisition.validators[0].required && yup.string().required(),
  startDate:
    demandInputs.demandStartDate.validators[0].required &&
    yup.string().required().matches(new RegExp(demandInputs.demandStartDate.validators[0].pattern)),
  originatorName: demandInputs.demandOriginator.validators[0].required && yup.string().required(),
  skillsID: demandInputs.demandSkill.validators[0].required && yup.string().required(),
  probability: demandInputs.demandProbability.validators[0].required && yup.string().required(),
  grade: demandInputs.demandGrade.validators[0].required && yup.string().required(),
  selectedApplicant: demandInputs.demandSelectedApplicant.validators[0].required && yup.string().required(),
  status: demandInputs.demandStatus.validators[0].required && yup.string().required(),
  notes: demandInputs.demandNotes.validators[0].required && yup.string().required(),
  proposedApplicant: demandInputs.demandProposedApplicant.validators[0].required && yup.string().required(),
  creationDate:
    demandInputs.demandCreationDate.validators[0].required &&
    yup.string().required().matches(new RegExp(demandInputs.demandCreationDate.validators[0].pattern)),
  location: demandInputs.demandLocation.validators[0].required && yup.string().required(),
})
