import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { firstBucket, secondBucket } from './storage/resource';
import { downloadData } from 'aws-amplify/storage';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

try {
  const result = downloadData({
    path: "album/2024/1.jpg",
    options: {
      // Specify a target bucket using name assigned in Amplify Backend
      bucket: "secondBucket"
    }
  }).result;
} catch (error) {
  console.log(`Error: ${error}`)
}

defineBackend({
  auth,
  data,
  storage,
  firstBucket,
  secondBucket
});

Amplify.configure(outputs);