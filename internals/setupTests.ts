import * as enzyme from "enzyme";
import ReactSixteenAdapterfrom from "enzyme-adapter-react-16";
import serializer from "jest-emotion";

enzyme.configure({ adapter: new ReactSixteenAdapterfrom() });

expect.addSnapshotSerializer(serializer);
