import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { Link } from "react-router-dom";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Link to="http://www.instagram.com">Facebook</Link>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
