import { api } from './api';
import type { QualityObjective } from '@/types';

export class QualityObjectiveService {
    private request = (url: string, options?: RequestInit) =>
        api(url, options).then(res => res.json());

    getObjectivesList = (): Promise<QualityObjective[]> =>
        this.request('quality-objective/list');

    viewQualityObjective = (id: string | number): Promise<QualityObjective> =>
        this.request('quality-objective/view-objective', {
            method: 'POST',
            body: JSON.stringify({ id })
        });

    storeObjective = (objectiveData: Partial<QualityObjective>): Promise<any> =>
        this.request('quality-objective/store-objective', {
            method: 'POST',
            body: JSON.stringify(objectiveData)
        });

    updateObjective = (objectiveData: Partial<QualityObjective>): Promise<any> =>
        this.request('quality-objective/update-objective', {
            method: 'POST',
            body: JSON.stringify(objectiveData)
        });

    removeObjective = (id: string | number): Promise<any> =>
        this.request('quality-objective/remove-objective', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
}