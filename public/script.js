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

const submitFeatureButton = () => {
  const submitButtonContainer = document.getElementById('new-feature');
  const submitButton = document.createElement('button');
  submitButtonContainer.append(submitButton);

  submitButton.innerText = 'Submit';
  submitButton.addEventListener('click', submitFeature);
};

const createFeatureSelect = async () => {
  const formArea = document.getElementById('form-area');

  const featureList = await getFeatures();
  const featureLabel = document.createElement('label');
  const featureSelect = document.createElement('select');
  formArea.append(featureLabel, featureSelect);

  featureLabel.innerText = 'Feature:';
  featureLabel.htmlFor = 'feature';
  featureSelect.name = 'feature';
  featureSelect.id = 'feature';

  featureList.forEach((feature) => {
    const featureOption = document.createElement('option');

    featureOption.value = feature.name;
    featureOption.innerText = feature.name;
    featureSelect.append(featureOption);
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

const submitBug = async () => {
  const errorContainer = document.getElementById('error-message');

  const problemText = document.querySelector('input[name="problem"]').value;
  const errorText = document.querySelector('input[name="error"]').value;
  const featureSel = document.querySelector('select[name="feature"]').value;

  console.log(problemText, errorText, featureSel);

  if (problemText === '' || errorText === '') {
    errorContainer.innerText = 'Please fill in the form before submitting.';
    errorContainer.style.display = 'block';
  } else {
    // axios.post('/bugs/new', {
    //   problem: problemText,
    //   error: errorText,
    //   feature: featureSel,
    // }).catch((error) => {
    //   console.log(error);
    // });

    errorContainer.style.display = 'none';
    document.querySelector('input[name="problem"]').value = '';
    document.querySelector('input[name="error"]').value = '';
  }
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

createFeatureSelect();
createBugList();
submitFeatureButton();
