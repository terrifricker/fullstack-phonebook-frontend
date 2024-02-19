## Full Stack Open Source
### Part 2 - Phonebook
### Exercises 2.6 - 2.17

*This program is a rudimentary phonebook with a field for filtering by name, a form for entering names and phone numbers, and a display of the people matching the search term or if that field is empty, a display of all people.  When displayed, each person has a delete button shown to remove them from the phonebook.*\
 ![phonebook screenshot](public/phonebook-screenshot.png) 

The names and numbers are kept in a json file, db.json, found in the root directory. The tool json-server is used to to act as our server located at port 3001 to interact with our data by running `npx json-server --port 3001 --watch db.json`.

The axios library will be used to fetch data from json-server.  The REST API code is found in src/services/persons.js

App.jsx returns the following components
  - Notification (a field to show messages)
  - Filter (a field for entering a search term to match names)
  - AddForm (a form for adding or updating people)
  - DisplayPersons (displays either all people or people matching the search term with a delete button for removing the person from the phonebook)

To run the program\
`npm run server`\
`npm run dev`
