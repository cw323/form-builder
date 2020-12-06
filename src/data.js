const data = {
  "questions": [
    {
      "id": "generate an id",
      "text": "User entered question.",
      "type": "user selected question type from the allowed list.",
      "media": {
        "id": "generate an id for the media",
        "url": "fake URL for the uploaded media",
        "file_name": "media file name from the upload",
        "content_type": "image or video?"
      },
// options can be in single or grid form, hence row and column object
      "options": {
// array of options for row for both grid and single question types
      "row": [
        {
          "id": "generate an id for the answer",
          "text": "Text entered by the user",
          "sequence": 1
        }
      ],
// array of options for column for grid question type
      "column": [
          {
            "id": "generate an id for the answer",
            "text": "Text entered by the user",
            "sequence": 1
          }
        ],
      },
      "sequence": 1,
      "randomize": true,
      "include_other": true
    }
  ],
  "max_allowed_questions": 10,
  "allowed_question_types": ["RADIO", "CHECK_BOX", "RADIO_GRID", "CHECK_BOX_GRID"]
};

export default data;
