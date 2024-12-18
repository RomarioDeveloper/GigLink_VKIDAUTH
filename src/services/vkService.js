const updateUserLoginInfo = async (User, vkProfile, ip) => {
    let user = await User.findOne({ where: { vk_id: vkProfile.id } });
    if (!user) {
        user = await User.create({
            vk_id: vkProfile.id,
            name: vkProfile.displayName,
            avatar_url: vkProfile.photos[0]?.value,
            email: vkProfile.emails?.[0]?.value || null,
            ip_address: ip,
        });
    } else {
        await user.update({ last_login_at: new Date(), ip_address: ip });
    }
    return user;
};

module.exports = { updateUserLoginInfo };