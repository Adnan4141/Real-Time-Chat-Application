export const formatMessageTime = (createdAt) => {
   const createdDate = new Date(createdAt);
   const now = new Date();

   const diffMs = now - createdDate; // Difference in milliseconds
   const diffMinutes = Math.floor(diffMs / (1000 * 60)); // Convert to minutes
   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // Convert to days

   // If the message was sent less than 5 minutes ago
   if (diffMinutes < 5) {
       return diffMinutes === 0 ? "Just now" : `${diffMinutes} min ago`;
   }

   // If the message was sent today
   if (createdDate.toDateString() === now.toDateString()) {
       return createdDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
   }

   // If the message was sent yesterday
   const yesterday = new Date();
   yesterday.setDate(now.getDate() - 1);
   if (createdDate.toDateString() === yesterday.toDateString()) {
       return "Yesterday";
   }

   // If the message was sent within the last week, show the weekday name
   if (diffDays < 7) {
       return createdDate.toLocaleDateString([], { weekday: 'long' }); // "Monday", "Tuesday", etc.
   }

   // If the message is older than a week, show the full date
   return createdDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }); // "Feb 20, 2025"
};

