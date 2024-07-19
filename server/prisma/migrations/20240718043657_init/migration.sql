-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'doctor';

-- AlterTable
ALTER TABLE `patient` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user';
