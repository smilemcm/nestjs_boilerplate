import { Test } from '@nestjs/testing';
import { BaseModule } from 'src/core/core.module';
import { PaginationService } from 'src/utils/pagination/service/pagination.service';

describe('PaginationService', () => {
    let paginationService: PaginationService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [BaseModule],
        }).compile();

        paginationService = moduleRef.get<PaginationService>(PaginationService);
    });

    it('should be defined', () => {
        expect(paginationService).toBeDefined();
    });

    describe('skip', () => {
        it('should be called', async () => {
            const test = jest.spyOn(paginationService, 'skip');

            await paginationService.skip(1, 10);
            expect(test).toHaveBeenCalledWith(1, 10);
        });

        it('should be success', async () => {
            const skip = paginationService.skip(1, 10);
            jest.spyOn(paginationService, 'skip').mockImplementation(
                () => skip
            );

            expect(paginationService.skip(1, 10)).toBe(skip);
        });
    });

    describe('totalPage', () => {
        it('should be called', async () => {
            const test = jest.spyOn(paginationService, 'totalPage');

            await paginationService.totalPage(100, 10);
            expect(test).toHaveBeenCalledWith(100, 10);
        });

        it('should be success', async () => {
            const totalPage = paginationService.totalPage(100, 10);
            jest.spyOn(paginationService, 'totalPage').mockImplementation(
                () => totalPage
            );

            expect(paginationService.totalPage(100, 10)).toBe(totalPage);
        });
    });
});
