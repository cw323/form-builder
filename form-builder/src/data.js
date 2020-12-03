export const data = {
  "questions": [
    // START OF Object shape of ONE question
    {
      // id for the question
      "id": "generate an id",
      // question text input
      "text": "User entered question.",
      // type is selected from the drop down menu in the header? where it says "Select Grid?"
      "type": "user selected question type from the allowed list.",
      // option to upload a media in image or video form
      "media": {
        // id for media
        "id": "generate an id for the media",
        // url for media
        "url": "fake URL for the uploaded media",
        // file name from upload
        "file_name": "media file name from the upload",
        // image or video that was uploaded?
        "content_type": "image or video?"
      },
      "options": [
      // an array of options / answers that the user has entered.
        {
          // Object shape of ONE answer option
          // id of answer
          "id": "generate an id for the answer",
          // answer text input
          "text": "Text entered by the user",
          //
          "sequence": 1
        }
      ],
      // which sequence order will this question be
      "sequence": 1,
      // should the rows be randomized?
      "randomize": true,
      // allow multiple responses per row?
      "include_other": true
    }
    // END OF ONE QUESTION OBJECT
  ],
  // how many questions are allowed / how many objects in array, max
  "max_allowed_questions": 10,

  "allowed_question_types": ["RADIO", "CHECK_BOX", "RADIO_GRID", "CHECK_BOX_GRID"]
};