import pandas as pd, numpy as np, re, time
from nltk.stem.porter import PorterStemmer

from io import StringIO

from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from sklearn.svm import LinearSVC
from sklearn.model_selection import cross_val_score
from sklearn.naive_bayes import GaussianNB
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

data = pd.read_json('Sarcasm_Headlines_Dataset.json', lines = True)

data['headline'] = data['headline'].apply(lambda s : re.sub('[^a-zA-Z]', ' ', s))

features = data['headline']
# print(features)
labels = data['is_sarcastic']

ps = PorterStemmer()
features = features.apply(lambda x: x.split())
features = features.apply(lambda x : " ".join([ps.stem(word) for word in x]))

from sklearn.feature_extraction.text import TfidfVectorizer
tv = TfidfVectorizer(max_features = 5000)
features = list(features)
copy_features = features[:]
features = tv.fit_transform(features).toarray()

features_train, features_test, labels_train, labels_test = train_test_split(features, labels, test_size = .05, random_state = 0)

lsvc = LinearSVC()
# training the model
lsvc.fit(features_train, labels_train)
# getting the score of train and test data
# print(lsvc.score(features_train, labels_train)) # 90.93
# print(lsvc.score(features_test, labels_test))

# print(lsvc.predict('I never you that water is wet.'))
def predict(lsvc, features, text):
    tv = TfidfVectorizer(max_features=5000)
    features = list(features)
    features.append(text)
    arr = tv.fit_transform(features).toarray()[-1]

    return lsvc.predict([arr])

print(predict(lsvc, copy_features,"I believe so"))