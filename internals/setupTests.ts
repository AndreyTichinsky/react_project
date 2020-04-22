import * as enzyme from "enzyme";
import ReactSixteenAdapterfrom from "enzyme-adapter-react-16";
import serializer from "jest-emotion";

(enzyme as any).configure({ adapter: new ReactSixteenAdapterfrom() });

expect.addSnapshotSerializer(serializer);
