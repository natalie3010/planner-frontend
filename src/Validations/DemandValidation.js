import * as yup from 'yup'
import formValidators from '../../formValidatorsConfig.json'

const demandInputs = formValidators.demandForm.inputs

export const demandSchema = yup.object().shape({
  demandCodeRequisition: demandInputs.demandCodeRequisition.validators[0].required && yup.string().required(),
  demandStartDate:
    demandInputs.demandStartDate.validators[0].required &&
    yup.string().required().matches(new RegExp(demandInputs.demandStartDate.validators[0].pattern)),
  demandClient: demandInputs.demandClient.validators[0].required && yup.string().required(),
  demandOriginator: demandInputs.demandOriginator.validators[0].required && yup.string().required(),
  demandSkills: demandInputs.demandSkills.validators[0].required && yup.string().required(),
  demandProbability: demandInputs.demandProbability.validators[0].required && yup.string().required(),
  demandGrade: demandInputs.demandGrade.validators[0].required && yup.string().required(),
  demandSelectedApplicant: demandInputs.demandSelectedApplicant.validators[0].required && yup.string().required(),
  demandStatus: demandInputs.demandStatus.validators[0].required && yup.string().required(),
  demandNotes: demandInputs.demandNotes.validators[0].required && yup.string().required(),
  demandProposedApplicant: demandInputs.demandProposedApplicant.validators[0].required && yup.string().required(),
  demandCreationDate:
    demandInputs.demandCreationDate.validators[0].required &&
    yup.string().required().matches(new RegExp(demandInputs.demandCreationDate.validators[0].pattern)),
  demandLocation: demandInputs.demandLocation.validators[0].required && yup.string().required(),
})
