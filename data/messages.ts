import { Message, DoorPosition } from '../types';

export const MESSAGES: Message[] = [
  {
    id: 1,
    title: "Even when I don’t deserve it...",
    body: "Tonight you cleaned up the kitchen and the house after hearing me complain about not feeling well and not helping much. And this is all after getting dinner ready for the kids and helping Grace with piano!",
    signature: "You patiently do so much for me and the kids"
  },
  {
    id: 2,
    title: "You keep us grounded",
    body: "When I worry about the future, you calmly and confidently remind me to place my faith in the Lord and trust that everything will work out. \"Do you trust that the Lord has your (our) best interest in mind?\"",
  },
  {
    id: 3,
    title: "You are a “Doer”",
    body: "I just watched you give Henry his first haircut and it looks great! I admire your ability to jump in and do things, and am amazed at how well you do!",
  },
  {
    id: 4,
    title: "You do so much for our family",
    body: "There’s so much thought that goes into something like a family vacation and you handle all of it! Formula, diapers, sound machines, packing 5 bags for 5 different people.. I’m always amazed by this.",
  },
  {
    id: 5,
    title: "You’re the glue",
    body: "Whether our immediate family or extended family, you’re the glue that keeps things together and makes it all work. It’s just not the same without you!",
  },
  {
    id: 6,
    title: "You are selfless",
    body: "You stayed up until 2am last night waiting for a call to serve someone who you’ve never met that you felt deep sorrow for. You are full of the pure love of Christ!",
  },
  {
    id: 7,
    title: "You are talented",
    body: "There is potentially no market more saturated in Utah than photography, and yet, you always have more interest than you can handle! Why? Because you are talented, and it shows in your work.",
  },
  {
    id: 8,
    title: "You have incredible intuition",
    body: "I love being able to go to you with questions and thoughts, and trusting your innately good instincts.",
  },
  {
    id: 9,
    title: "You make our family look good",
    body: "From Christmas cards being sent to dozens of friends to Christmas gifts for our family and neighbor gifts for our community—it takes a lot of work but you make us look good!",
  },
  {
    id: 10,
    title: "You look good",
    body: "Your eyes, your smile, your personality—You are beautiful!",
  },
  {
    id: 11,
    title: "You are a wonderful example",
    body: "You set a wonderful example for our family in living a Christlike life, focused on helping others.",
  },
  {
    id: 12,
    title: "Fully involved in our children’s lives",
    body: "From volunteering for classroom parties to helping with piano practice and organizing birthday parties, you are always there for them.",
  },
  {
    id: 13,
    title: "You put Him first",
    body: "I always know that Christ comes first in your life.",
  },
  {
    id: 14,
    title: "You make life fun",
    body: "You naturally bring people together and make together time memorable.",
  },
  {
    id: 15,
    title: "You work hard",
    body: "Late nights of editing, cleaning the kitchen for the 3rd time in a day... your diligence never goes unnoticed.",
  },
  {
    id: 16,
    title: "You do things I don’t know how to do",
    body: "You carefully think through how the kids will perceive their gifts, adding that magical touch I often miss.",
  },
  {
    id: 17,
    title: "You are thoughtful",
    body: "Nobody leaves something you planned without feeling loved.",
  },
  {
    id: 18,
    title: "You are my best friend",
    body: "Through all the chaos of raising a family, you remain my favorite person to talk to, laugh with, and dream with.",
  },
  {
    id: 19,
    title: "You are patient",
    body: "Even when things get hectic, your patience brings a sense of calm to our home that we all desperately need.",
  },
  {
    id: 20,
    title: "I love you",
    body: "For all these reasons and a million more I haven't listed, I love you more than words can express. Merry Christmas, Lexi.",
  }
];

// 4 Columns x 5 Rows Grid Layout
// Column centers: 12.5%, 37.5%, 62.5%, 87.5%
// Row centers: 12%, 31%, 50%, 69%, 88%

export const DOOR_POSITIONS: DoorPosition[] = [
  // Row 1
  { id: 1, top: '12%', left: '12.5%', rotation: -2 },
  { id: 2, top: '12%', left: '37.5%', rotation: 1 },
  { id: 3, top: '12%', left: '62.5%', rotation: -1 },
  { id: 4, top: '12%', left: '87.5%', rotation: 2 },
  
  // Row 2
  { id: 5, top: '31%', left: '12.5%', rotation: 1 },
  { id: 6, top: '31%', left: '37.5%', rotation: -2 },
  { id: 7, top: '31%', left: '62.5%', rotation: 3 },
  { id: 8, top: '31%', left: '87.5%', rotation: -1 },
  
  // Row 3
  { id: 9, top: '50%', left: '12.5%', rotation: -1 },
  { id: 10, top: '50%', left: '37.5%', rotation: 2 },
  { id: 11, top: '50%', left: '62.5%', rotation: -2 },
  { id: 12, top: '50%', left: '87.5%', rotation: 1 },
  
  // Row 4
  { id: 13, top: '69%', left: '12.5%', rotation: 2 },
  { id: 14, top: '69%', left: '37.5%', rotation: -1 },
  { id: 15, top: '69%', left: '62.5%', rotation: 2 },
  { id: 16, top: '69%', left: '87.5%', rotation: -3 },
  
  // Row 5
  { id: 17, top: '88%', left: '12.5%', rotation: -2 },
  { id: 18, top: '88%', left: '37.5%', rotation: 1 },
  { id: 19, top: '88%', left: '62.5%', rotation: -1 },
  { id: 20, top: '88%', left: '87.5%', rotation: 2 },
];
