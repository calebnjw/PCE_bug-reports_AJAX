const getFeatures = async () => {
  const { data: featureList } = await axios.get('/features');
  return featureList;
};

const getBugs = async () => {
  const { data: bugList } = await axios.get('/bugs/all');
  return bugList;
};

const submitBugButton = () => {
  const submitButtonContainer = document.getElementById('submit-bug-button');
  const submitButton = document.createElement('button');
  submitButtonContainer.append(submitButton);

  submitButton.innerText = 'Submit';
  submitButton.addEventListener('click', submitBug);
};

const submitBug = async () => {
  const errorContainer = document.getElementById('error-message');

  const problemText = document.querySelector('input[name="problem"]').value;
  const errorText = document.querySelector('input[name="error"]').value;
  const featureSel = document.querySelector('input[name="feature"]:checked').value;

  console.log(problemText, errorText, featureSel);

  if (problemText === '' || errorText === '') {
    errorContainer.innerText = 'Please fill in the form before submitting.';
    errorContainer.style.display = 'block';
  } else {
    axios.post('/bugs/new', {
      problem: problemText,
      error: errorText,
      feature: featureSel,
    }).catch((error) => {
      console.log(error);
    });

    errorContainer.style.display = 'none';
    document.querySelector('input[name="problem"]').value = '';
    document.querySelector('input[name="error"]').value = '';
  }

};

const submitFeatureButton = () => {
  const submitButtonContainer = document.getElementById('new-feature');
  const submitButton = document.createElement('button');
  submitButtonContainer.append(submitButton);

  submitButton.innerText = 'Submit';
  submitButton.addEventListener('click', submitFeature);
};

const submitFeature = async () => {
  const featureName = document.querySelector('input[name="feature-name"]').value;

  axios.post('/features/new', {
    name: featureName,
  }).catch((error) => {
    console.log(error);
  });

  document.querySelector('input[name="feature-name"]').value = '';
  window.location.href = '/';
};

const createFeatureSelection = async () => {
  const formArea = document.getElementById('form-area');
  const featureForm = document.createElement('form');
  formArea.append(featureForm);

  const featureList = await getFeatures();
  featureList.forEach((feature) => {
    const featureInput = document.createElement('input');
    const featureLabel = document.createElement('label');

    featureInput.type = 'radio';
    featureInput.id = feature.name;
    featureInput.value = feature.name;
    featureInput.name = 'feature';

    featureLabel.htmlFor = feature.name;
    featureLabel.innerText = feature.name;

    featureForm.append(featureInput, featureLabel);
  });

  submitBugButton();
};

const createBugList = async () => {
  const bugArea = document.getElementById('bug-area');

  const bugList = await getBugs();
  bugList.forEach((bug) => {
    const bugContainer = document.createElement('div');

    bugContainer.innerText = `${bug.id}: (${bug.feature.name}) ${bug.problem} `;

    bugArea.append(bugContainer);
  });
};

createFeatureSelection();
createBugList();
submitFeatureButton();
