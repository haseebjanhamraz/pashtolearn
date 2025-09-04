import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSection = ({ currentLanguage, userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name,
    email: userProfile?.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const labels = {
    en: {
      title: 'Account Information',
      name: 'Full Name',
      email: 'Email Address',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      edit: 'Edit Profile',
      save: 'Save Changes',
      cancel: 'Cancel',
      changePassword: 'Change Password',
      memberSince: 'Member since',
      lastLogin: 'Last login'
    },
    ps: {
      title: 'د حساب معلومات',
      name: 'بشپړ نوم',
      email: 'د بریښنالیک پته',
      currentPassword: 'اوسنی پاسورډ',
      newPassword: 'نوی پاسورډ',
      confirmPassword: 'د نوي پاسورډ تصدیق',
      edit: 'پروفایل سمول',
      save: 'بدلونونه خوندي کړئ',
      cancel: 'لغوه کړئ',
      changePassword: 'پاسورډ بدل کړئ',
      memberSince: 'غړی د',
      lastLogin: 'وروستی ننوتل'
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = currentLanguage === 'en' ? 'Name is required' : 'نوم اړین دی';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = currentLanguage === 'en' ? 'Email is required' : 'بریښنالیک اړین دی';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = currentLanguage === 'en' ? 'Invalid email format' : 'د بریښنالیک غلط بڼه';
    }

    if (formData?.newPassword && formData?.newPassword?.length < 6) {
      newErrors.newPassword = currentLanguage === 'en' ? 'Password must be at least 6 characters' : 'پاسورډ باید لږترلږه ۶ حروف ولري';
    }

    if (formData?.newPassword && formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === 'en' ? 'Passwords do not match' : 'پاسورډونه سره سمون نلري';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateProfile(formData);
      setIsEditing(false);
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name,
      email: userProfile?.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {labels?.[currentLanguage]?.title}
          </h3>
        </div>
        
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            {labels?.[currentLanguage]?.edit}
          </Button>
        )}
      </div>
      <div className="space-y-4">
        <Input
          label={labels?.[currentLanguage]?.name}
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          error={errors?.name}
          required
        />

        <Input
          label={labels?.[currentLanguage]?.email}
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          error={errors?.email}
          required
        />

        {isEditing && (
          <>
            <div className="border-t border-border pt-4 mt-6">
              <h4 className="text-md font-medium text-foreground mb-4 flex items-center space-x-2">
                <Icon name="Lock" size={16} />
                <span>{labels?.[currentLanguage]?.changePassword}</span>
              </h4>
              
              <div className="space-y-4">
                <Input
                  label={labels?.[currentLanguage]?.currentPassword}
                  type="password"
                  name="currentPassword"
                  value={formData?.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                />

                <Input
                  label={labels?.[currentLanguage]?.newPassword}
                  type="password"
                  name="newPassword"
                  value={formData?.newPassword}
                  onChange={handleInputChange}
                  error={errors?.newPassword}
                  placeholder="Enter new password"
                />

                <Input
                  label={labels?.[currentLanguage]?.confirmPassword}
                  type="password"
                  name="confirmPassword"
                  value={formData?.confirmPassword}
                  onChange={handleInputChange}
                  error={errors?.confirmPassword}
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={handleCancel}
              >
                {labels?.[currentLanguage]?.cancel}
              </Button>
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
          </>
        )}

        {!isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>{labels?.[currentLanguage]?.memberSince}: {userProfile?.memberSince}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>{labels?.[currentLanguage]?.lastLogin}: {userProfile?.lastLogin}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSection;