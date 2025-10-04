// The Cloud Functions for Firebase SDK to create Cloud Functions.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

// Initialize the app so it can connect to other Firebase services
admin.initializeApp();

// Get a reference to the Firestore database
const db = admin.firestore();

/**
 * A Cloud Function that triggers when a new user is created.
 * It adds a "welcome task" to the 'tasks' collection for that user.
 */
exports.addWelcomeTask = functions.auth.user().onCreate(async (user) => {
  // This log will appear in the Firebase Functions logs
  functions.logger.info(`New user created: ${user.uid} - ${user.email}`);

  // This is the task object we will add to Firestore
  const welcomeTask = {
    text: "Welcome to your new Task Manager!",
    status: "pending",
    // We use the server's timestamp for accuracy
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    // We associate this task with the new user's ID
    userId: user.uid,
  };

  try {
    // Add the new task document to the 'tasks' collection
    const docRef = await db.collection("tasks").add(welcomeTask);
    // Log the success message with the new document's ID
    functions.logger.info(
        `Welcome task added with ID: ${docRef.id} for user ${user.uid}`,
    );
    return null;
  } catch (error) {
    functions.logger.error("Error adding welcome task:", error);
    return null;
  }
});

// This empty line at the end fixes the 'eol-last' linting error.