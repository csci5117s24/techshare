import { render, screen } from "@testing-library/react"
import Button from "./Button"
import { act } from "react-dom/test-utils"
import { expect } from "vitest"


test('button test', () => {
  render(<Button />)

  const element = screen.getByRole('button')
  expect(element).toBeDefined()
  expect(element).toHaveTextContent('false')
  act(() => element.click())
  expect(element).toHaveTextContent('true')
})

