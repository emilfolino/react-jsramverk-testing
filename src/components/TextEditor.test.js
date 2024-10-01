import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import TextEditor from './TextEditor';

test('renders Titel label', () => {
  render(<TextEditor />);
  const labelElement = screen.getByText("Titel");
  expect(labelElement).toBeInTheDocument();
});

test('renders Innehåll label', () => {
  render(<TextEditor />);
  const labelElement = screen.getByText("Innehåll");
  expect(labelElement).toBeInTheDocument();
});

test("title variable gets value when text is entered", async () => {
    const inputValue = 'Hej';
    render(<TextEditor />);

    const user = userEvent.setup();

    const titleInput = screen.getByLabelText("Titel");

    await user.type(titleInput, inputValue);

    expect(titleInput).toHaveValue(inputValue);

    const textContainer = screen.getByText(inputValue);
    expect(textContainer).toBeInTheDocument();
});

test("content variable gets value when text is entered", async () => {
    const inputValue = 'Hopp';
    render(<TextEditor />);

    const user = userEvent.setup();

    const contentInput = screen.getByLabelText("Innehåll");

    await user.type(contentInput, inputValue);

    expect(contentInput).toHaveValue(inputValue);

    const textContainer = screen.getAllByText(inputValue);

    expect(textContainer).toHaveLength(2);
});

test("title and content variables gets cleared when pushing button", async () => {
    const titleValue = 'Hej';
    const contentValue = 'Hopp';

    render(<TextEditor />);

    const user = userEvent.setup();

    const titleInput = screen.getByLabelText("Titel");

    await user.type(titleInput, titleValue);

    const contentInput = screen.getByLabelText("Innehåll");

    await user.type(contentInput, contentValue);

    await user.click(screen.getByText('Rensa'));

    const titleContainer = screen.queryAllByText(titleValue);
    expect(titleContainer).toHaveLength(0);

    const contentContainer = screen.queryAllByText(contentValue);
    expect(contentContainer).toHaveLength(0);
});
