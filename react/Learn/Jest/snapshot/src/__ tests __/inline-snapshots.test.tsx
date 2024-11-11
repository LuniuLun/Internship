import { MemoryRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Link to="https://example.com">Example Site</Link>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
<a
  href="https://example.com"
>
  Example Site
</a>
`);
});
