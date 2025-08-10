import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';




const apiKey = your_api_key;// Replace with your actual API key and import from .env like process.env.YOUR_API_KEY
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash', // Verify this model name with current API docs
});

const generationConfig = {
  temperature: 1,
  topP: 0.5,
  topK: 40,
  maxOutputTokens: 120,
  responseMimeType: 'text/plain',
};

// Optional: Add safety settings if needed
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      // safetySettings, // Uncomment if you want to use safety settings
      history: []
    });
    
    const result = await chatSession.sendMessage(prompt);
    return result.response.text()
      // Remove markdown formatting
    .replace(/\*\*(.*?)\*\*/g, '$1')     // Remove **bold**
    .replace(/\*(.*?)\*/g, '$1')         // Remove *italic* and *actions*
    .replace(/`(.*?)`/g, '$1')           // Remove `code`
    .replace(/#{1,6}\s/g, '')            // Remove headers
    .replace(/>\s/g, '')                 // Remove blockquotes
    .replace(/^\s*[-*+]\s/gm, '')        // Remove list markers
    .replace(/^\s*\d+\.\s/gm, '')        // Remove numbered lists
    
    // Convert symbols to words for better TTS
    .replace(/&/g, ' and ')
    .replace(/@/g, ' at ')
    .replace(/#/g, ' hashtag ')
    .replace(/\$/g, ' dollar ')
    .replace(/%/g, ' percent ')
    .replace(/\+/g, ' plus ')
    .replace(/=/g, ' equals ')
    .replace(/</g, ' less than ')
    .replace(/>/g, ' greater than ')
    
    // Remove remaining special characters
    .replace(/[^a-zA-Z0-9\s.,!?;:()-]/g, ' ')
    
    // Clean up spacing and formatting
    .replace(/\n+/g, '. ')               // Replace newlines with periods
    .replace(/\s*\.\s*\.\s*/g, '. ')     // Fix multiple periods
    .replace(/\s+/g, ' ')                // Clean up extra spaces
    .replace(/^\.\s*/, '')               // Remove leading periods
    .trim();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

export default run;


/* 
  specific role based ai 

  import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// ⚠️ WARNING: Move this to environment variables for production!
const apiKey = `AIzaSyCLpue_qK5cWG9ubkb9mCNJLINVzH6l76s`
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.5,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Predefined role templates
const roleTemplates = {
  codeReviewer: `You are an expert senior software engineer and code reviewer. Your role is to:
- Analyze code for bugs, performance issues, and best practices
- Provide constructive feedback with specific suggestions
- Explain the reasoning behind your recommendations
- Focus on code quality, maintainability, and security
- Be thorough but concise in your reviews`,

  teacher: `You are a patient and knowledgeable teacher. Your role is to:
- Explain concepts in simple, easy-to-understand language
- Use examples and analogies to clarify complex topics
- Ask questions to check understanding
- Encourage learning and provide positive reinforcement
- Break down complex problems into manageable steps`,

  therapist: `You are a compassionate and professional therapist. Your role is to:
- Listen actively and empathetically
- Ask thoughtful, open-ended questions
- Provide emotional support and validation
- Offer coping strategies and practical advice
- Maintain professional boundaries and suggest professional help when needed`,

  businessAnalyst: `You are a strategic business analyst. Your role is to:
- Analyze business problems with data-driven insights
- Identify opportunities and risks
- Provide actionable recommendations
- Think about market trends and competitive landscape
- Focus on ROI and business value`,

  creativeTutor: `You are an enthusiastic creative writing mentor. Your role is to:
- Inspire creativity and imagination
- Provide constructive feedback on writing
- Suggest techniques to improve storytelling
- Help develop characters and plot
- Encourage experimentation with different styles`,

  fitnessCoach: `You are a certified fitness coach and nutritionist. Your role is to:
- Create personalized workout plans
- Provide nutrition advice and meal suggestions
- Motivate and encourage healthy habits
- Explain proper form and safety considerations
- Adapt recommendations based on fitness levels and goals`
};

// Method 1: Using system prompt with role
async function runWithRole(prompt, role = 'teacher') {
  try {
    const rolePrompt = roleTemplates[role] || roleTemplates.teacher;
    
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: rolePrompt }]
        },
        {
          role: "model", 
          parts: [{ text: "I understand my role. How can I help you today?" }]
        }
      ]
    });
    
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

// Method 2: Combining role with user prompt
async function runWithCombinedPrompt(prompt, role = 'teacher') {
  try {
    const rolePrompt = roleTemplates[role] || roleTemplates.teacher;
    const combinedPrompt = `${rolePrompt}\n\nUser Question: ${prompt}\n\nPlease respond according to your role:`;
    
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: []
    });
    
    const result = await chatSession.sendMessage(combinedPrompt);
    return result.response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

// Method 3: Creating a persistent role-based chat session
class RoleBasedChatSession {
  constructor(role = 'teacher') {
    this.role = role;
    this.rolePrompt = roleTemplates[role] || roleTemplates.teacher;
    this.chatSession = null;
    this.initialized = false;
  }

  async initialize() {
    try {
      this.chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: "user",
            parts: [{ text: this.rolePrompt }]
          },
          {
            role: "model",
            parts: [{ text: "I understand my role and I'm ready to help. What would you like to know?" }]
          }
        ]
      });
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing chat session:', error);
      throw error;
    }
  }

  async sendMessage(prompt) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const result = await this.chatSession.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  changeRole(newRole) {
    if (roleTemplates[newRole]) {
      this.role = newRole;
      this.rolePrompt = roleTemplates[newRole];
      this.initialized = false; // Reset session for new role
    } else {
      throw new Error(`Role '${newRole}' not found. Available roles: ${Object.keys(roleTemplates).join(', ')}`);
    }
  }

  getAvailableRoles() {
    return Object.keys(roleTemplates);
  }
}

// Export different methods
export default runWithRole;
export { runWithCombinedPrompt, RoleBasedChatSession, roleTemplates };


*/