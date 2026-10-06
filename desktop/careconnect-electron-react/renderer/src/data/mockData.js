export const tasks = [
  {time:'8:00 am', title:'Morning tablets', detail:'Take 2 tablets with water.', type:'Medicine', done:true},
  {time:'8:30 am', title:'Breakfast', detail:'Porridge with berries and tea.', type:'Meal'},
  {time:'10:30 am', title:'Morning walk', detail:'Around the garden, 15 minutes.', type:'Activity'},
  {time:'12:30 pm', title:'Lunch', detail:'Sandwich and fruit.', type:'Meal'},
  {time:'2:00 pm', title:'Afternoon rest', detail:'Lie down for 30 minutes.', type:'Rest'},
  {time:'3:30 pm', title:'Vision Plus Opticians', detail:'Maria is driving. Bring your glasses.', type:'Appointment'}
]

export const medicines = [
  {name:'Memantine', dose:'10 mg — 1 tablet', times:['8:00 am','8:00 pm'], notes:'Take with water.'},
  {name:'Vitamin D3', dose:'1000 IU — 1 capsule', times:['8:30 am'], notes:'Take with breakfast.'},
  {name:'Amlodipine', dose:'5 mg — 1 tablet', times:['12:00 pm'], taken:true},
  {name:'Atorvastatin', dose:'20 mg — 1 tablet', times:['10:00 pm']},
  {name:'Paracetamol', dose:'500 mg — only if needed', times:['As needed']}
]

export const appointments = [
  {title:'Vision Plus Opticians', when:'Tuesday, 24 September — 3:30 pm', location:'Vision Plus Opticians — 22 High Street', carer:'Maria Thompson', today:true},
  {title:'Annual health review', when:'Monday, 30 Sep — 10:00 am', location:'Greenfield Surgery — 12 Greenfield Road', carer:'Joyce Adeyemi'},
  {title:'Blood test', when:'Thursday, 3 Oct — 9:00 am', location:'Greenfield Surgery', carer:'Maria Thompson'},
  {title:'Dentist check-up', when:'Friday, 11 Oct — 2:00 pm', location:'Westfield Dental — 8 Park Lane'},
  {title:'GP phone call', when:'Wednesday, 16 Oct — 11:00 am', location:'Telephone consultation'}
]

export const activities = [
  ['Marked Memantine as taken','MEDICATION TAKEN','9:12 am'],
  ['Checked in at 10:15 am','CHECKED IN','10:15 am'],
  ['Task completed: Morning walk','TASK COMPLETED','10:30 am'],
  ['Unmarked Amlodipine','MEDICATION UNMARKED','12:30 pm'],
  ['Marked Vitamin D3 as taken','MEDICATION TAKEN','3:00 pm']
]
