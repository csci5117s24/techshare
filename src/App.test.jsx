import { render, screen } from "@testing-library/react"
import { expect } from "vitest"
import App from "./App"

test('App test', () => {
  const result = render(<App />);

  const addButton = screen.getByRole('button')
  expect(addButton).toBeDefined();
})