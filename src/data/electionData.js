export const indianStates = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Andaman & Nicobar','Chandigarh','Dadra & Nagar Haveli',
  'Delhi','Jammu & Kashmir','Ladakh','Lakshadweep','Puducherry'
];

export const requiredDocuments = {
  identity: ['Aadhaar Card','PAN Card','Passport','Driving License','Class X/XII Marksheet'],
  address: ['Aadhaar Card','Utility Bills (Water/Electricity/Gas)','Bank Passbook','Registered Rent Agreement','Ration Card'],
  photo: ['Recent passport-size color photograph']
};

export const votingDayChecklist = [
  { id: 1, text: 'Carry your Voter ID (EPIC) or valid photo ID', icon: 'id-card' },
  { id: 2, text: 'Know your polling booth location and number', icon: 'map-pin' },
  { id: 3, text: 'Reach the polling station before closing time (6 PM)', icon: 'clock' },
  { id: 4, text: 'Stand in the queue — every person in line by 6 PM can vote', icon: 'users' },
  { id: 5, text: 'Get your finger inked after casting your vote', icon: 'check-circle' },
  { id: 6, text: 'Do NOT carry phones or cameras inside the booth', icon: 'phone-off' },
  { id: 7, text: 'Verify your name on the voter list before going', icon: 'search' }
];

export const electionPhases = [
  { id: 1, title: 'Notification', description: 'Election Commission announces election dates', date: '2025-03-15', status: 'completed' },
  { id: 2, title: 'Nomination Filing', description: 'Candidates file their nomination papers', date: '2025-03-22', status: 'completed' },
  { id: 3, title: 'Scrutiny of Nominations', description: 'Returning officer examines nomination papers', date: '2025-03-25', status: 'completed' },
  { id: 4, title: 'Withdrawal of Candidature', description: 'Last date for candidates to withdraw', date: '2025-03-28', status: 'completed' },
  { id: 5, title: 'Campaign Period', description: 'Candidates campaign for votes', date: '2025-04-15', status: 'completed' },
  { id: 6, title: 'Campaign Silence', description: 'No campaigning 48 hours before polling', date: '2025-04-23', status: 'completed' },
  { id: 7, title: 'Polling Day - Phase 1', description: 'Voting in first phase constituencies', date: '2025-05-10', status: 'upcoming' },
  { id: 8, title: 'Polling Day - Phase 2', description: 'Voting in second phase constituencies', date: '2025-05-17', status: 'upcoming' },
  { id: 9, title: 'Counting Day', description: 'Votes are counted and results declared', date: '2025-06-04', status: 'upcoming' },
  { id: 10, title: 'Results Declaration', description: 'Final results announced by ECI', date: '2025-06-05', status: 'upcoming' }
];

export const mockPollingStations = [
  { id: 1, name: 'Government Primary School, Sector 5', address: 'Sector 5, Dwarka, New Delhi - 110075', lat: 28.5921, lng: 77.0460, distance: '0.8 km', timings: '7:00 AM - 6:00 PM', boothNo: '145' },
  { id: 2, name: 'Community Hall, Janakpuri', address: 'Block C, Janakpuri, New Delhi - 110058', lat: 28.6219, lng: 77.0878, distance: '1.2 km', timings: '7:00 AM - 6:00 PM', boothNo: '203' },
  { id: 3, name: 'Municipal Corporation School', address: 'Rajouri Garden, New Delhi - 110027', lat: 28.6467, lng: 77.1228, distance: '2.1 km', timings: '7:00 AM - 6:00 PM', boothNo: '89' },
  { id: 4, name: 'Sarvodaya Vidyalaya', address: 'Tilak Nagar, New Delhi - 110018', lat: 28.6402, lng: 77.0976, distance: '1.8 km', timings: '7:00 AM - 6:00 PM', boothNo: '167' },
  { id: 5, name: 'Government Girls Senior Secondary School', address: 'Palam Colony, New Delhi - 110045', lat: 28.5800, lng: 77.0700, distance: '2.5 km', timings: '7:00 AM - 6:00 PM', boothNo: '312' }
];
