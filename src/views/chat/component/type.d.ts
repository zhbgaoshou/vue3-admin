export interface MessageProps {
  role: "assistant" | "user";
  content?: string;
  dateTime?: string;
  isLoading?: boolean;
}
