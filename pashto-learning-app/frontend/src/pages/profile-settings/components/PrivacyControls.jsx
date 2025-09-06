import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyControls = ({ currentLanguage, privacySettings, onUpdatePrivacySettings, onDeleteAccount }) => {
  const [localSettings, setLocalSettings] = useState(privacySettings);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const labels = {
    en: {
      title: 'Privacy & Data Controls',
      dataSharing: 'Data Sharing Preferences',
      shareProgress: 'Share learning progress with other users',
      shareAchievements: 'Display achievements publicly',
      analyticsData: 'Allow anonymous usage analytics',
      marketingEmails: 'Receive marketing emails and updates',
      progressVisibility: 'Progress Visibility',
      publicProfile: 'Make profile publicly visible',
      showStreak: 'Show current streak on profile',
      showLevel: 'Display current level publicly',
      dataExport: 'Data Management',
      exportAll: 'Export All Data',
      deleteAccount: 'Delete Account',
      deleteWarning: 'This action cannot be undone',
      confirmDelete: 'Confirm Account Deletion',
      cancelDelete: 'Cancel',
      save: 'Save Privacy Settings',
      deleteConfirmText: 'Are you sure you want to delete your account? This will permanently remove all your progress, achievements, and personal data.',
      typeDelete: 'Type "DELETE" to confirm'
    },
    ps: {
      title: 'د محرمیت او ډیټا کنټرول',
      dataSharing: 'د ډیټا شریکولو غوراوي',
      shareProgress: 'د نورو کاروونکو سره د زده کړې پرمختګ شریک کړئ',
      shareAchievements: 'لاسته راوړنې په عامه توګه وښایاست',
      analyticsData: 'د نامعلومه کارونې تحلیلاتو اجازه ورکړئ',
      marketingEmails: 'د بازارموندنې بریښنالیکونه او تازه معلومات ترلاسه کړئ',
      progressVisibility: 'د پرمختګ لیدل کیدل',
      publicProfile: 'پروفایل په عامه توګه د لیدو وړ کړئ',
      showStreak: 'په پروفایل کې اوسنۍ پرله پسې ورځې وښایاست',
      showLevel: 'اوسنۍ کچه په عامه توګه وښایاست',
      dataExport: 'د ډیټا مدیریت',
      exportAll: 'ټول ډیټا صادر کړئ',
      deleteAccount: 'حساب ړنګ کړئ',
      deleteWarning: 'دا عمل بیرته نشي کیدی',
      confirmDelete: 'د حساب ړنګولو تصدیق',
      cancelDelete: 'لغوه کړئ',
      save: 'د محرمیت تنظیمات خوندي کړئ',
      deleteConfirmText: 'ایا تاسو ډاډه یاست چې غواړئ خپل حساب ړنګ کړئ؟ دا به ستاسو ټول پرمختګ، لاسته راوړنې، او شخصي ډیټا د تل لپاره لرې کړي.',
      typeDelete: 'د تصدیق لپاره "DELETE" ولیکئ'
    }
  };

  const handleCheckboxChange = (field, checked) => {
    setLocalSettings(prev => ({ ...prev, [field]: checked }));
  };

  const handleSave = () => {
    onUpdatePrivacySettings(localSettings);
  };

  const handleExportData = () => {
    // Mock data export - in real app would generate and download file
    const exportData = {
      profile: { name: "Ahmad Khan", email: "ahmad@example.com" },
      progress: { totalLessons: 45, currentStreak: 12, totalXP: 2850 },
      achievements: ["First Steps", "Week Warrior", "Vocabulary Master"],
      exportDate: new Date()?.toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pashtolearn-data-export.json';
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    onDeleteAccount();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-full">
          <Icon name="Shield" size={20} className="text-error" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {labels?.[currentLanguage]?.title}
        </h3>
      </div>
      <div className="space-y-6">
        {/* Data Sharing */}
        <div>
          <h4 className="text-md font-medium text-foreground mb-4">
            {labels?.[currentLanguage]?.dataSharing}
          </h4>
          <div className="space-y-3 pl-4">
            <Checkbox
              label={labels?.[currentLanguage]?.shareProgress}
              checked={localSettings?.shareProgress}
              onChange={(e) => handleCheckboxChange('shareProgress', e?.target?.checked)}
            />
            
            <Checkbox
              label={labels?.[currentLanguage]?.shareAchievements}
              checked={localSettings?.shareAchievements}
              onChange={(e) => handleCheckboxChange('shareAchievements', e?.target?.checked)}
            />
            
            <Checkbox
              label={labels?.[currentLanguage]?.analyticsData}
              checked={localSettings?.analyticsData}
              onChange={(e) => handleCheckboxChange('analyticsData', e?.target?.checked)}
            />
            
            <Checkbox
              label={labels?.[currentLanguage]?.marketingEmails}
              checked={localSettings?.marketingEmails}
              onChange={(e) => handleCheckboxChange('marketingEmails', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Progress Visibility */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-foreground mb-4">
            {labels?.[currentLanguage]?.progressVisibility}
          </h4>
          <div className="space-y-3 pl-4">
            <Checkbox
              label={labels?.[currentLanguage]?.publicProfile}
              checked={localSettings?.publicProfile}
              onChange={(e) => handleCheckboxChange('publicProfile', e?.target?.checked)}
            />
            
            <Checkbox
              label={labels?.[currentLanguage]?.showStreak}
              checked={localSettings?.showStreak}
              onChange={(e) => handleCheckboxChange('showStreak', e?.target?.checked)}
              disabled={!localSettings?.publicProfile}
            />
            
            <Checkbox
              label={labels?.[currentLanguage]?.showLevel}
              checked={localSettings?.showLevel}
              onChange={(e) => handleCheckboxChange('showLevel', e?.target?.checked)}
              disabled={!localSettings?.publicProfile}
            />
          </div>
        </div>

        {/* Data Management */}
        <div className="border-t border-border pt-6">
          <h4 className="text-md font-medium text-foreground mb-4">
            {labels?.[currentLanguage]?.dataExport}
          </h4>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              {labels?.[currentLanguage]?.exportAll}
            </Button>
            
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              {labels?.[currentLanguage]?.deleteAccount}
            </Button>
            <p className="text-xs text-error text-center">
              {labels?.[currentLanguage]?.deleteWarning}
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            {labels?.[currentLanguage]?.save}
          </Button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-full">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {labels?.[currentLanguage]?.confirmDelete}
              </h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {labels?.[currentLanguage]?.deleteConfirmText}
            </p>
            
            <p className="text-sm font-medium text-foreground mb-2">
              {labels?.[currentLanguage]?.typeDelete}:
            </p>
            
            <input
              type="text"
              placeholder="DELETE"
              className="w-full p-2 border border-border rounded-md mb-4 text-sm"
              onChange={(e) => {
                const button = document.getElementById('confirm-delete-btn');
                if (button) {
                  button.disabled = e?.target?.value !== 'DELETE';
                }
              }}
            />
            
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowDeleteConfirm(false)}
                fullWidth
              >
                {labels?.[currentLanguage]?.cancelDelete}
              </Button>
              <Button
                id="confirm-delete-btn"
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled
                fullWidth
              >
                {labels?.[currentLanguage]?.deleteAccount}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyControls;