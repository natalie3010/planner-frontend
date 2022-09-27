import React from "react";
import { act } from "react-dom/test-utils";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../Utils/testSetup";
import { ListClients } from "../ListClients";
import { setupClients } from "../../Slices/DashboardSlice";


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));


jest.mock("../../API", () => ({
    getClients: jest.fn(() => Promise.resolve([{ clientName: "test-client" , clientID: "test-client-id"}])),
    postClient: jest.fn(() => Promise.resolve(true)),
    putClient: jest.fn(() => Promise.resolve(true)),
}));

jest.mock("../../Slices/DashboardSlice", () => ({
    setupClients: jest.fn(() => Promise.resolve(true)),
}));


jest.mock("../../Data/Format", () => ({
    clientFormFormatter: jest.fn()
}));

jest.mock('../../Utils/util', () => ({
    checkIfFormIsValid: jest.fn(),
  }))


const mockClientData = {
    clientName: "test-client",
    clientID: "test-client-id",

}

describe("<ListClients/> component", () => {
    describe("Different stages of ListClients component", () => {
        it("should display 'Loading' if clientdata is not present", async () => {
            act(() => {
                renderWithProviders(<ListClients />);
            })
            expect(
                await waitFor(() => {
                    screen.getByText("Loading...", { exact: false })
                })
            ).toBeInTheDocument;
        });

    })
})