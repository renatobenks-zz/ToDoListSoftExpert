import { AphroditeStyles, state, event } from '../components.mock';

import SeverityComponent from './Severity';

describe('Component: Severity', () => {
    beforeEach(() => {
        AphroditeStyles.before();
    });

    test('should be imported', () => {
        expect(SeverityComponent).toBeDefined();
    });

    describe('constructor () =>', () => {
        test('should create render method with responsibility to render severity list', () => {
            expect(SeverityComponent.render).toBeDefined();
        });
    });

    describe('render () =>', () => {
        test('should get all severities for render them', () => {
            spyOn(SeverityComponent, 'getSeverities');

            SeverityComponent.render(state.severities);
            expect(SeverityComponent.getSeverities).toHaveBeenCalledWith(state.severities);
        });

        test('should render the severities list rendered', () => {
            spyOn(SeverityComponent, 'renderSeveritiesList');

            const severities = SeverityComponent.render(state.severities);
            expect(SeverityComponent.renderSeveritiesList).toHaveBeenCalled();
            expect(severities).toBe(SeverityComponent.renderSeveritiesList());
        });
    });

    describe('changeTodoSeverity () =>', () => {
        test('should change the severity selected', () => {
            SeverityComponent.changeTodoSeverity(event);
            expect(SeverityComponent.severity).toBe('data value');
        });
    });

    describe('renderSeveritiesList () =>', () => {
        test('should return a select of severities', () => {
            SeverityComponent.getSeverities(state.severities);
            const severities = SeverityComponent.renderSeveritiesList();
            expect(SeverityComponent.severity).toBeDefined();
            expect(typeof SeverityComponent.severity).toBe('string');
            expect(SeverityComponent.severities).toBeDefined();
            expect(typeof SeverityComponent.severities).toBe('string');
            expect(severities).toBeDefined();
            expect(typeof severities).toBe('string');
        });
    });

    describe('getSeverities () =>', () => {
        test('should return options on list of severities', () => {
            spyOn(SeverityComponent, 'getSeverity');
            SeverityComponent.getSeverities(state.severities);

            expect(SeverityComponent.severities).toBeDefined();
            expect(SeverityComponent.severity).toBe('normal');
            expect(SeverityComponent.getSeverity).toHaveBeenCalledTimes(state.severities.length);

            for (let severity of state.severities) {
                expect(SeverityComponent.getSeverity).toHaveBeenCalledWith(severity);
            }
        });
    });

    describe('getSeverity () =>', () => {
        test('should push severity option for severities options', () => {
            SeverityComponent.getSeverity(state.severities[0]);
        });
    });

    afterEach(() => {
        AphroditeStyles.after();
    });
});
