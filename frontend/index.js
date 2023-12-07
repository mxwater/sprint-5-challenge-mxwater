async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  try {
    
    const [learnersResponse, mentorsResponse] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors'),
    ]);

    const learnersData = learnersResponse.data;
    const mentorsData = mentorsResponse.data;

    const combinedData = combineData(learnersData, mentorsData);

    displayInfo('Fetching learner cards...');
    displayInfo('No learner is selected');

    displayLearnerCards(combinedData);
  } catch (error) {
    displayInfo('Something went wrong');
    console.error('Error:', error);
  }
}

function combineData(learners, mentors) {
  return learners.map(learner => {
    const mentorsNames = learner.mentors.map(mentorId => {
      const mentor = mentors.find(m => m.id === mentorId);
      return mentor ? `${mentor.firstName} ${mentor.lastName}` : '';
    });

    return {
      id: learner.id,
      email: learner.email,
      fullName: learner.fullName,
      mentors: mentorsNames,
    };
  });

  
}

function displayLearnerCards(learnerData) {
  const cardsContainer = document.querySelector('.cards');

  learnerData.forEach(learner => {
    const cardElement = createLearnerCard(learner);
    cardsContainer.appendChild(cardElement);
  });
}



function createLearnerCard(learner) {
  const card = document.createElement('div');
  card.classList.add('card');

  const fullName = document.createElement('h3');
  fullName.textContent = `${learner.fullName}`
  card.appendChild(fullName);

  const idElement = document.createElement('span');
  idElement.textContent = `, ID ${learner.id}`;
  idElement.classList.add('learner-id');
  idElement.style.display = 'none';
  fullName.appendChild(idElement);

  const email = document.createElement('p');
  email.textContent = `${learner.email}`;
  card.appendChild(email);

  const mentorsHeader = document.createElement('h4');
  mentorsHeader.classList.add('closed');
  mentorsHeader.textContent = 'Mentors';

  const mentorsList = document.createElement('ul');
  mentorsList.classList.add('mentors-list');
  mentorsList.style.display = 'none';

  learner.mentors.forEach(mentor => {
    const mentorItem = document.createElement('li');
    mentorItem.textContent = mentor;
    mentorsList.appendChild(mentorItem);
  });


  card.appendChild(mentorsHeader)
  card.appendChild(mentorsList);




  card.addEventListener('click', () => {
    const selectedCards = document.querySelectorAll('.card.selected');
    selectedCards.forEach(selectedCard => {
      if (selectedCard !== card) {
        selectedCard.classList.remove('selected');
        selectedCard.querySelector('.mentors-list').style.display = 'none';
      selectedCard.querySelector('.learner-id').style.display = 'none'; 
      }

      
    });

    

    card.classList.toggle('selected');
    const mentorsList = card.querySelector('.mentors-list');
    const idElement = card.querySelector('.learner-id');
    mentorsList.style.display = card.classList.contains('selected') ? 'block' : 'none';
    idElement.style.display = card.classList.contains('selected') ? 'inline' : 'none';

    displaySelectedInfo(learner, card.classList.contains('selected'));
  });



  
  mentorsHeader.addEventListener('click', (event) => {
    event.stopPropagation();

    const selectedCards = document.querySelectorAll('.card.selected');
    selectedCards.forEach(selectedCard => {
      if (selectedCard !== card) {
        selectedCard.classList.remove('selected');
      }
    });


    card.classList.add('selected');

    const mentorsList = card.querySelector('.mentors-list');
    mentorsList.style.display = mentorsList.style.display === 'none' ? 'block' : 'none';
  });



const footer = document.querySelector('footer');
const currentYear = new Date().getFullYear();
footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  return card;

  
}


function displayInfo(message) {
  const infoSection = document.querySelector('.info');
  infoSection.textContent = message;
}


function displaySelectedInfo(learner, isSelected) {
  const infoSection = document.querySelector('.info');

  if (isSelected) {
    infoSection.textContent = `The selected learner is ${learner.fullName}`;
  } else {
    const selectedCards = document.querySelectorAll('.card.selected');

    if (selectedCards.length === 0) {
      infoSection.textContent = 'No learner is selected';
    }
  }

  


  // 👆 WORK WORK ABOVE THIS LINE 👆
  
}
 
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()