import { act } from "react";
import { render, screen } from "@testing-library/react";
import Event from "./Event";

const mockDates = [
  {
    timestamp: 1700000000000,
    records: [
      { name: "Alice", answer: "yes" },
      { name: "Bob", answer: "no" },
    ],
  },
  {
    timestamp: 1700100000000,
    records: [
      { name: "Alice", answer: "if-needed" },
      { name: "Bob", answer: "yes" },
    ],
  },
];

describe("Event Component", () => {
  test("renders event title and location", () => {
    render(<Event id="1" title="Team Meeting" location="Office" dates={mockDates} />);
    
    expect(screen.getByText("Team Meeting")).toBeInTheDocument();
    expect(screen.getByText("Location: Office")).toBeInTheDocument();
  });

  test("renders voting table correctly", () => {
    render(<Event id="1" title="Team Meeting" location="Office" dates={mockDates} />);
    
    expect(screen.getByText("Participant")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  test("displays correct voting answers", () => {
    render(<Event id="1" title="Team Meeting" location="Office" dates={mockDates} />);
    
    expect(screen.getAllByText("✅").length).toBe(2); 
    expect(screen.getAllByText("❌").length).toBe(1);
    expect(screen.getAllByText("🤔").length).toBe(1);

  });

  test("renders fallback message if no dates are available", () => {
    render(<Event id="1" title="Empty Event" dates={[]} />);
    
    expect(screen.getByText("No available dates for voting.")).toBeInTheDocument();
  });
});
