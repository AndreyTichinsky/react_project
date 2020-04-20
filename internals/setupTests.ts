import * as enzyme from "enzyme";
import ReactSixteenAdapterfrom from "enzyme-adapter-react-16";

(enzyme as any).configure({ adapter: new ReactSixteenAdapterfrom() });
