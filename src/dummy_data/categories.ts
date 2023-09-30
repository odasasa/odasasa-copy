import { Category } from "@/types";

const vegetableCategory: Category = {
    _id: '1',
    name: 'Vegetables',
  
    // units: 'kg',
    status: 'Active',
    createdAt: new Date(),
};

const fruitCategory: Category = {
    _id: '2',
    name: 'Fruits',
   
    // units: 'Each',
    status: 'paused',
    createdAt: new Date(),
};

const cerealCategory: Category = {
    _id: '3',
    name: 'Cereals',
    
    // units: 'kg',
    status: 'Active',
    createdAt: new Date(),
};

// Create an array to hold these categories
export const categories: Category[] = [vegetableCategory, fruitCategory, cerealCategory];

// You can now use the 'categories' array as needed.




const data = { "response_code": 0, "results": [
    { "category": "Geography",
     "type": "multiple",
     "difficulty": "medium",
      "question": "Which state of the United States is the smallest?", 
      "correct_answer": "Rhode Island ",
       "incorrect_answers": ["Maine", "Vermont", "Massachusetts"] 
    },
        { "category": "Entertainment: Cartoon & Animations", "type": "multiple", "difficulty": "easy", "question": "Which of these is NOT a catchphrase used by Rick Sanchez in the TV show &quot;Rick and Morty&quot;?", "correct_answer": "Slam dunk, nothing but net!", "incorrect_answers": ["Hit the sack, Jack!", "Rikki-Tikki-Tavi, biatch!", "Wubba-lubba-dub-dub!"] }, { "category": "Art", "type": "boolean", "difficulty": "easy", "question": "Leonardo da Vinci&#039;s Mona Lisa does not have eyebrows.", "correct_answer": "True", "incorrect_answers": ["False"] }, { "category": "Politics", "type": "boolean", "difficulty": "easy", "question": "There was a satirical candidate named &quot;Deez Nuts&quot; running in the 2016 US presidential elections.", "correct_answer": "True", "incorrect_answers": ["False"] }, { "category": "General Knowledge", "type": "multiple", "difficulty": "easy", "question": "What is the name of the Jewish New Year?", "correct_answer": "Rosh Hashanah", "incorrect_answers": ["Elul", "New Year", "Succoss"] }, { "category": "History", "type": "multiple", "difficulty": "easy", "question": "Which of the following ancient peoples was NOT classified as Hellenic (Greek)?", "correct_answer": "Illyrians", "incorrect_answers": ["Dorians", "Achaeans", "Ionians"] }, { "category": "Entertainment: Video Games", "type": "multiple", "difficulty": "hard", "question": "In &quot;Sonic the Hedgehog 2&quot; for the Sega Genesis, what do you input in the sound test screen to access the secret level select?", "correct_answer": "The Lead Programmer&#039;s birthday", "incorrect_answers": ["The first release date of &quot;Sonic the Hedgehog&quot;", "The date Sonic Team was founded", "The first release date of &quot;Sonic the Hedgehog 2&quot;"] }, { "category": "Entertainment: Cartoon & Animations", "type": "multiple", "difficulty": "easy", "question": "Who voices for Ruby in the animated series RWBY?", "correct_answer": "Lindsay Jones", "incorrect_answers": ["Tara Strong", "Jessica Nigri", "Hayden Panettiere"] }, { "category": "Entertainment: Cartoon & Animations", "type": "multiple", "difficulty": "hard", "question": "Who voice acted the character Hiccup in the movie &quot;How to Train Your Dragon&quot;?", "correct_answer": "Jay Baruchel", "incorrect_answers": ["Jack Brauchel", "John Powell", "Gerard Butler"] }, { "category": "Entertainment: Cartoon & Animations", "type": "multiple", "difficulty": "medium", "question": "Who is the &quot;dumb blonde&quot; character in Nickelodeon&#039;s &quot;The Loud House&quot;?", "correct_answer": "Leni", "incorrect_answers": ["Luan", "Luna", "Lincoln"] }, { "category": "Entertainment: Music", "type": "multiple", "difficulty": "medium", "question": "Which one of these rappers is NOT a member of the rap group Wu-Tang Clan?", "correct_answer": "Dr.Dre", "incorrect_answers": ["Ol&#039; Dirty Bastard", "GZA", "Method Man"] }, { "category": "Entertainment: Television", "type": "multiple", "difficulty": "medium", "question": "What is Meg&#039;s full name in &quot;Family Guy&quot;?", "correct_answer": "Megatron Griffin", "incorrect_answers": ["Who-Cares Griffin", "Neil Griffin", "Megan Griffin"] }, { "category": "Entertainment: Japanese Anime & Manga", "type": "multiple", "difficulty": "medium", "question": "What was studio Trigger&#039;s first original long-form animated series for television?", "correct_answer": "Kill la Kill", "incorrect_answers": ["Kiznaiver", "Inferno Cop", "Gurren Lagann"] }, { "category": "History", "type": "multiple", "difficulty": "easy", "question": "These two countries held a commonwealth from the 16th to 18th century.", "correct_answer": "Poland and Lithuania", "incorrect_answers": ["Hutu and Rwanda", "North Korea and South Korea", "Bangladesh and Bhutan"] }, { "category": "Entertainment: Cartoon & Animations", "type": "multiple", "difficulty": "hard", "question": "Townsend Coleman provided the voice for which turtle in the original 1987 series of &quot;Teenage Mutant Ninja Turtles&quot;?", "correct_answer": "Michelangelo", "incorrect_answers": ["Leonardo", "Donatello", "Raphael"] }, { "category": "General Knowledge", "type": "multiple", "difficulty": "easy", "question": "What are Panama hats made out of?", "correct_answer": "Straw", "incorrect_answers": ["Silk", "Hemp", "Flax"] }, { "category": "History", "type": "multiple", "difficulty": "hard", "question": "Which of the following physicists did NOT work on the Manhattan project?", "correct_answer": "Murray Gell-Mann", "incorrect_answers": ["Richard Feynman", "J. Robert Oppenheimer", "John Von-Neumann"] }] }