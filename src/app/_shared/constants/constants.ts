import { PROCESSINGPERIOD } from '../interfaces/PROCESSINGPERIOD';
import { SELECTITEM } from '../interfaces/SELECTITEM';

const currentContactYear: number = null;
const currentContactMonth: number = null;
const ssrDateRange: string = 'NODATEYET';

const joinedYears: SELECTITEM[] = [];
const gradYears: SELECTITEM[] = [];
const contactYears: SELECTITEM[] = [];
const currentPaymentYear: number = 2025;
const paymentYears: SELECTITEM[] = [
  { value: '2025', label: '2025' },
];
const pastGradYears: SELECTITEM[] = [
  { value: '2006', label: '2006' },
  { value: '2007', label: '2007' },
  { value: '2008', label: '2008' },
  { value: '2009', label: '2009' },
  { value: '2010', label: '2010' },
  { value: '2011', label: '2011' },
  { value: '2012', label: '2012' },
  { value: '2013', label: '2013' },
  { value: '2014', label: '2014' },
  { value: '2015', label: '2015' },
  { value: '2016', label: '2016' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
];

const months: SELECTITEM[] = [
  { value: '1', label: 'Jan/Ene' },
  { value: '2', label: 'Feb/Feb' },
  { value: '3', label: 'Mar/Mar' },
  { value: '4', label: 'Apr/Abr' },
  { value: '5', label: 'May/May' },
  { value: '6', label: 'Jun/Jun' },
  { value: '7', label: 'Jul/Jul' },
  { value: '8', label: 'Aug/Ago' },
  { value: '9', label: 'Sep/Set' },
  { value: '10', label: 'Oct/Oct' },
  { value: '11', label: 'Nov/Nov' },
  { value: '12', label: 'Dec/Dic' }
];

const qrPeriods: SELECTITEM[] = [];

const gradesProcessingPeriods: PROCESSINGPERIOD[] = [];

const inscriptionsProcessingPeriods: PROCESSINGPERIOD[] = [];

const genders: SELECTITEM[] = [
  { value: 'M', label: 'Male/Hombre' },
  { value: 'F', label: 'Female/Mujer' }
];

const emojis = [ // values are set in the RadioButton html
  '/assets/images/needsAttention.svg',  // -1
  '/assets/images/thumbsUp.svg',  // 0
  '/assets/images/celebrate.svg', // 3
  '/assets/images/concerned.svg', // 2
  '/assets/images/NA.jpg'         // 4
];

const emojiMsgs = [
  'Needs Attention',
  'Thumbs Up',
  'Celebrate',
  'Concerned',
  'N/A'
];


const timelinessMsgs =new Map<string, string>([
  ['green', 'Reports Up-to-date'],
  ['yellow', 'Report Due this month'],
  ['red', 'Report Overdue'],
  ['N/A', 'Reports N/A for Masters']
]);

const gradesTimelinessMsgs =new Map<string, string>([
  ['green', 'Grades Up-to-date'],
  ['yellow', 'Grades Due this month'],
  ['red', 'Grades Overdue']
]);

const gpaMsgs = new Map<string, string>([
  ['green', 'GPA Meets Requirement'],
  ['yellow', 'GPA Below Requirement'],
  ['red', 'GPA Too Low']
]);


const languageStatuses: SELECTITEM[] = [
];

const studentStatuses: SELECTITEM[] = [
];
const memberStatuses: SELECTITEM[] = [
];
const reviewedStatuses: SELECTITEM[] = [
];
const communicationStatuses: SELECTITEM[] = [
];
const reviewedQRStatuses: SELECTITEM[] = [
];
const memberTypes: SELECTITEM[] = [
];
const schoolTypes: SELECTITEM[] = [
];
const gradeMonths: SELECTITEM[] = [];

const followUpStatuses: SELECTITEM[] = [
  { value: '2092', label: 'Open' },
  { value: '2104', label: 'Closed' },
];

const highlightStatuses: SELECTITEM[] = [
];

const becaPaymentStatuses: SELECTITEM[] = [
];

const academicYearTypes: SELECTITEM[] = [];

const countryList: SELECTITEM[] = [];

export const constants = {
  joinedYears,
  // non-db
  gradYears,
  pastGradYears,
  contactYears,
  paymentYears,
  ssrDateRange,
  currentPaymentYear,
  currentContactYear,
  currentContactMonth,
  months,
  qrPeriods,


  genders,
  emojis,
  emojiMsgs,
  timelinessMsgs,
  gradesTimelinessMsgs,
  gpaMsgs,
  // db
  gradesProcessingPeriods,
  inscriptionsProcessingPeriods,
  languageStatuses,
  memberStatuses,
  schoolTypes,
  studentStatuses,
  reviewedQRStatuses,
  reviewedStatuses,
  communicationStatuses,
  memberTypes,
  followUpStatuses,
  highlightStatuses,
  becaPaymentStatuses,
  academicYearTypes,
  gradeMonths,
  countryList
};
